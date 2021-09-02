import Item from "../entity/Item";
import TaxCalculator from "./TaxCalculator";

export default class DefaultTaxCalculator extends TaxCalculator {
  getTax(item: Item): number {
    if (item.description === "Guitarra") {
      return 15;
    }
    if (item.description === "Cabo") {
      return 5;
    }
    return 0;
  }
}
