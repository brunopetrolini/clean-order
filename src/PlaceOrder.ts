import Coupon from "./Coupon";
import FreightCalculator from "./FreightCalculator";
import Item from "./Item";
import ItemRepository from "./ItemRepository";
import Order from "./Order";
import { PlaceOrderInput } from "./PlaceOrderInput";
import { PlaceOrderOutput } from "./PlaceOrderOutput";
import ZipcodeCalculatorAPI from "./ZipcodeCalculatorAPI";
import ZipcodeCalculatorAPIMemory from "./ZipcodeCalculatorAPIMemory";

export default class PlaceOrder {
  coupons: Coupon[];
  orders: Order[];
  zipcodeCalculator: ZipcodeCalculatorAPI;

  constructor(private readonly itemRepository: ItemRepository) {
    this.coupons = [
      new Coupon("VALE20", 20, new Date("2021-10-10")),
      new Coupon("VALE20_EXPIRED", 20, new Date("2020-10-10")),
    ];
    this.orders = [];
    this.zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
  }

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
      const coupon = this.coupons.find(
        (coupon) => coupon.code === input.coupon
      );
      if (coupon) order.addCoupon(coupon);
    }
    const total = order.getTotal();
    this.orders.push(order);
    return { total, freight: order.freight };
  }
}
