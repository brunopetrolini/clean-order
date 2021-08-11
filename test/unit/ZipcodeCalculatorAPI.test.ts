import ZipcodeCalculatorAPIMemory from "../../src/ZipcodeCalculatorAPIMemory";

describe("Zipcode Calculate", () => {
  test("Should calculate the distance between 2 CEPs", () => {
    const zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    const distance = zipcodeCalculator.calculate("37800-000", "37810-000");
    expect(distance).toBe(1000);
  });
});
