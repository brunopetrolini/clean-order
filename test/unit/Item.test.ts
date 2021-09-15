import Item from "../../src/domain/entity/Item";

describe("Item", () => {
  test("Should calculate the volume of a item", () => {
    const item = new Item(1, "Amplificador", 5000, 50, 50, 50, 22);
    const volume = item.getVolume();
    expect(volume).toBe(0.125);
  });

  test("Should calculate the density of a item", () => {
    const item = new Item(1, "Amplificador", 5000, 50, 50, 50, 22);
    const density = item.getDensity();
    expect(density).toBe(176);
  });
});
