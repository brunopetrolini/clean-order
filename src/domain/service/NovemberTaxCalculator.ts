import Item from "../entity/Item";
import TaxCalculator from "./TaxCalculator";

export default class NovemberTaxCalculator extends TaxCalculator {
  getTax(item: Item): number {
    if (item.description === "Guitarra") {
      return 5;
    }
    if (item.description === "Cabo") {
      return 1;
    }
    return 0;
  }
}
