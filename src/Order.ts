import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderItem from "./OrderItem";

export default class Order {
  cpf: Cpf;
  items: OrderItem[];
  coupon?: Coupon;

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
    this.items = [];
  }

  addItem(description: string, price: number, quantity: number): void {
    this.items.push(new OrderItem(description, price, quantity));
  }

  addCoupon(coupon: Coupon): void {
    if (!coupon.isExpired()) {
      this.coupon = coupon;
    }
  }

  getTotal(): number {
    let total = 0;
    for (const orderItem of this.items) {
      total += orderItem.getItemTotal();
    }
    if (this.coupon) {
      total -= (total * this.coupon.percentage) / 100;
    }
    return total;
  }
}
