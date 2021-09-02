import Item from "../entity/Item";

export default abstract class TaxCalculator {
  NOVEMBER: number;

  constructor() {
    this.NOVEMBER = 10;
  }

  calculate(item: Item) {
    return (item.price * this.getTax(item)) / 100;
  }

  abstract getTax(item: Item): number;
}
