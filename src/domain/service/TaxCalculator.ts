import Item from "../entity/Item";

export default abstract class TaxCalculator {
  calculate(item: Item) {
    return (item.price * this.getTax(item)) / 100;
  }

  abstract getTax(item: Item): number;
}
