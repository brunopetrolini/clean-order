import StockEntry from "../entity/StockEntry";

export default class StockCalculator {
  calculate(stockEntries: StockEntry[]): number {
    let quantity = 0;
    stockEntries.forEach((stockEntry) => {
      if (stockEntry.operation === "in") {
        quantity += stockEntry.quantity;
      }
      if (stockEntry.operation === "out") {
        quantity -= stockEntry.quantity;
      }
    });
    return quantity;
  }
}
