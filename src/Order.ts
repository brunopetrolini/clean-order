import Cpf from "./Cpf";
import OrderItem from "./OrderItem";

export default class Order {
  cpf: Cpf;
  items: OrderItem[];

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
    this.items = [];
  }

  addItem(description: string, price: number, quantity: number): void {
    this.items.push(new OrderItem(description, price, quantity));
  }

  getTotal(): number {
    let total = 0;
    for (const orderItem of this.items) {
      total += orderItem.getItemTotal();
    }
    return total;
  }
}
