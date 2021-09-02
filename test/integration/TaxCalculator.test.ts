import Item from "../../src/domain/entity/Item";
import DefaultTaxCalculator from "../../src/domain/service/DefaultTaxCalculator";
import NovemberTaxCalculator from "../../src/domain/service/NovemberTaxCalculator";

describe("TaxCalculator", () => {
  test("Should calculate the tax on a Guitar item in normal months", () => {
    const item = new Item("1", "Guitarra", 1000, 100, 50, 30, 8);
    const taxCalculator = new DefaultTaxCalculator();
    const amount = taxCalculator.calculate(item);
    expect(amount).toBe(150);
  });

  test("Should calculate the tax on a Guitar item in the month of november", () => {
    const item = new Item("1", "Guitarra", 1000, 100, 50, 30, 8);
    const taxCalculator = new NovemberTaxCalculator();
    const amount = taxCalculator.calculate(item);
    expect(amount).toBe(50);
  });

  test("Should calculate the tax on a Cable item in normal months", () => {
    const item = new Item("3", "Cabo", 30, 10, 10, 10, 1);
    const taxCalculator = new DefaultTaxCalculator();
    const amount = taxCalculator.calculate(item);
    expect(amount).toBe(1.5); // 5%
  });

  test("Should calculate the tax on a Cable item in the month of november", () => {
    const item = new Item("3", "Cabo", 30, 10, 10, 10, 1);
    const taxCalculator = new NovemberTaxCalculator();
    const amount = taxCalculator.calculate(item);
    expect(amount).toBe(0.3); // 3%
  });
});
