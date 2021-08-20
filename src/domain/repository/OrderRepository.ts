import Order from "../entity/Order";

export default interface OrderRepository {
  save(order: Order): void;
  get(code: string): Order;
  count(): number;
}
