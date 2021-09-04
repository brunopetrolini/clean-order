import Order from "../../domain/entity/Order";
import DatabaseRepositoryFactory from "../../domain/factory/DatabaseRepositoryFactory";
import TaxCalculatorFactory from "../../domain/factory/TaxCalculatorFactory";
import ZipcodeCalculatorAPI from "../../domain/gateway/ZipcodeCalculatorAPI";
import CouponRepository from "../../domain/repository/CouponRepository";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import TaxTableRepository from "../../domain/repository/TaxTableRepository";
import FreightCalculator from "../../domain/service/FreightCalculator";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";

export default class PlaceOrder {
  orderRepository: OrderRepository;
  itemRepository: ItemRepository;
  couponRepository: CouponRepository;
  taxTableRepository: TaxTableRepository;
  zipcodeCalculator: ZipcodeCalculatorAPI;

  constructor(
    databaseRepositoryFactory: DatabaseRepositoryFactory,
    zipcodeCalculator: ZipcodeCalculatorAPI
  ) {
    this.orderRepository = databaseRepositoryFactory.createOrderRepository();
    this.itemRepository = databaseRepositoryFactory.createItemRepository();
    this.couponRepository = databaseRepositoryFactory.createCouponRepository();
    this.taxTableRepository =
      databaseRepositoryFactory.createTaxTableRepository();
    this.zipcodeCalculator = zipcodeCalculator;
  }

  async execute({
    issueDate = new Date(),
    ...input
  }: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const sequence = (await this.orderRepository.count()) + 1;
    const order = new Order(input.cpf, issueDate, sequence);
    const distance = this.zipcodeCalculator.calculate(
      input.zipcode,
      "37800-000"
    );
    const taxCalculator = TaxCalculatorFactory.create(issueDate);
    for (const orderItem of input.items) {
      const item = await this.itemRepository.getById(orderItem.id);
      if (!item) throw new Error("Item not found");
      order.addItem(orderItem.id, item.price, orderItem.quantity);
      order.freight +=
        FreightCalculator.calculate(distance, item) * orderItem.quantity;
      const taxTables = await this.taxTableRepository.getByIdItem(item.id);
      const taxes = taxCalculator.calculate(item, taxTables);
      order.taxes += taxes * orderItem.quantity;
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.getByCode(input.coupon);
      if (coupon) order.addCoupon(coupon);
    }
    const total = order.getTotal();
    this.orderRepository.save(order);
    return {
      code: order.code.value,
      taxes: order.taxes,
      total,
      freight: order.freight,
    };
  }
}
