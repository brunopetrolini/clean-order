import StockEntry from "../../src/domain/entity/StockEntry";
import StockCalculator from "../../src/domain/service/StockCalculator";

describe("Stock Calculator", () => {
  test("Should calculate the stock of an item", () => {
    const stockEntries = [
      new StockEntry(1, "in", 3, new Date("2021-10-10")),
      new StockEntry(1, "out", 2, new Date("2021-10-10")),
      new StockEntry(1, "in", 2, new Date("2021-10-10")),
    ];
    const stockCalculator = new StockCalculator();
    const quantity = stockCalculator.calculate(stockEntries);
    expect(quantity).toBe(3);
  });
});
