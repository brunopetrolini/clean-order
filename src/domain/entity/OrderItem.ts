export default class OrderItem {
  id: number;
  price: number;
  quantity: number;

  constructor(id: number, price: number, quantity: number) {
    this.id = id;
    this.price = price;
    this.quantity = quantity;
  }

  getItemTotal(): number {
    return this.price * this.quantity;
  }
}
