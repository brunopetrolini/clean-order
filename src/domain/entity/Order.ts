import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderItem from "./OrderItem";

export default class Order {
  cpf: Cpf;
  items: OrderItem[];
  coupon?: Coupon;
  freight: number;
  code: string;
  issueDate: Date;
  sequence: number;

  constructor(cpf: string, issueDate: Date = new Date(), sequence: number = 1) {
    this.cpf = new Cpf(cpf);
    this.items = [];
    this.freight = 0;
    this.issueDate = issueDate;
    this.sequence = sequence;
    this.code = `${this.issueDate.getFullYear()}${new String(sequence).padStart(
      8,
      "0"
    )}`;
  }

  addItem(id: string, price: number, quantity: number): void {
    this.items.push(new OrderItem(id, price, quantity));
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
    total += this.freight;
    return total;
  }
}
