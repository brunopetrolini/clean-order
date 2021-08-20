import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {
  orders: Order[];

  constructor() {
    this.orders = [];
  }

  get(code: string): Order {
    const order = this.orders.find((order) => order.code.value === code);
    if (!order) throw new Error("Order not found");
    return order;
  }

  save(order: Order): void {
    this.orders.push(order);
  }

  count(): number {
    return this.orders.length;
  }
}
