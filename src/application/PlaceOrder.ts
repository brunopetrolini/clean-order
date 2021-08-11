import Order from "../domain/entity/Order";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";
import ZipcodeCalculatorAPI from "../domain/gateway/ZipcodeCalculatorAPI";
import CouponRepository from "../domain/repository/CouponRepository";
import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";
import FreightCalculator from "../domain/service/FreightCalculator";

export default class PlaceOrder {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly itemRepository: ItemRepository,
    private readonly couponRepository: CouponRepository,
    private readonly zipcodeCalculator: ZipcodeCalculatorAPI
  ) {}

  execute(input: PlaceOrderInput): PlaceOrderOutput {
    const order = new Order(input.cpf);
    const distance = this.zipcodeCalculator.calculate(
      input.zipcode,
      "37800-000"
    );
    for (const orderItem of input.items) {
      const item = this.itemRepository.getById(orderItem.id);
      if (!item) throw new Error("Item not found");
      order.addItem(orderItem.id, item.price, orderItem.quantity);
      order.freight +=
        FreightCalculator.calculate(distance, item) * orderItem.quantity;
    }
    if (input.coupon) {
      const coupon = this.couponRepository.getByCode(input.coupon);
      if (coupon) order.addCoupon(coupon);
    }
    const total = order.getTotal();
    this.orderRepository.save(order);
    return { total, freight: order.freight };
  }
}