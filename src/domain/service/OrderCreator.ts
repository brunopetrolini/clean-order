import PlaceOrderInput from "../../application/place-order/PlaceOrderInput";
import Order from "../entity/Order";
import DatabaseRepositoryFactory from "../factory/DatabaseRepositoryFactory";
import TaxCalculatorFactory from "../factory/TaxCalculatorFactory";
import ZipcodeCalculatorAPI from "../gateway/ZipcodeCalculatorAPI";
import CouponRepository from "../repository/CouponRepository";
import ItemRepository from "../repository/ItemRepository";
import OrderRepository from "../repository/OrderRepository";
import TaxTableRepository from "../repository/TaxTableRepository";
import FreightCalculator from "./FreightCalculator";

export default class OrderCreator {
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

  async create({ issueDate = new Date(), ...input }: PlaceOrderInput) {
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
    await this.orderRepository.save(order);
    return order;
  }
}
