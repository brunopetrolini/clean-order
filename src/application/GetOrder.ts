import ZipcodeCalculatorAPI from "../domain/gateway/ZipcodeCalculatorAPI";
import CouponRepository from "../domain/repository/CouponRepository";
import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";
import GetOrderOutput from "./GetOrderOutput";

export default class GetOrder {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly itemRepository: ItemRepository
  ) {}

  async execute(code: string): Promise<GetOrderOutput> {
    const order = await this.orderRepository.get(code);
    const orderItems: any[] = [];
    for (const orderItem of order.items) {
      const item = await this.itemRepository.getById(orderItem.id);
      const orderItemOutput = {
        itemDescription: item?.description,
        price: orderItem.price,
        quantity: orderItem.quantity,
      };
      orderItems.push(orderItemOutput);
    }
    return new GetOrderOutput({
      code: order.code.value,
      freight: order.freight,
      total: order.getTotal(),
      orderItems,
    });
  }
}
