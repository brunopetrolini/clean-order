import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import ZipcodeCalculatorAPI from "../../src/domain/gateway/ZipcodeCalculatorAPI";
import DatabaseRepositoryFactory from "../../src/domain/factory/DatabaseRepositoryFactory";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";
import PlaceOrder from "../../src/application/place-order/PlaceOrder";

describe("PlaceOrder", () => {
  let zipcodeCalculator: ZipcodeCalculatorAPI;
  let placeOrder: PlaceOrder;
  let databaseRepositoryFactory: DatabaseRepositoryFactory;

  beforeEach(async () => {
    databaseRepositoryFactory = new MemoryRepositoryFactory();
    zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    placeOrder = new PlaceOrder(databaseRepositoryFactory, zipcodeCalculator);
    const stockEntryRepository = databaseRepositoryFactory.createStockEntryRepository();
    await stockEntryRepository.clean();
  });

  test("Should make a order ", async () => {
    const input = {
      cpf: "778.278.412-36",
      zipcode: "37800-000",
      items: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
        { id: 3, quantity: 3 },
      ],
      coupon: "VALE20",
    };
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(5982);
  });

  test("Should make a order with expired coupon", async () => {
    const input = {
      cpf: "778.278.412-36",
      zipcode: "37800-000",
      items: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
        { id: 3, quantity: 3 },
      ],
      coupon: "VALE20_EXPIRED",
    };
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(7400);
  });

  test("Should make a order with freight calculation", async () => {
    const input = {
      cpf: "778.278.412-36",
      zipcode: "37800-000",
      items: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
        { id: 3, quantity: 3 },
      ],
      coupon: "VALE20_EXPIRED",
    };
    const output = await placeOrder.execute(input);
    expect(output.freight).toBe(310);
  });

  test("Should make a order calculating the code", async () => {
    const input = {
      cpf: "778.278.412-36",
      zipcode: "37800-000",
      items: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
        { id: 3, quantity: 3 },
      ],
      issueDate: new Date("2021-10-10"),
      coupon: "VALE20_EXPIRED",
    };
    const orderRepository = databaseRepositoryFactory.createOrderRepository();
    orderRepository.clean();
    await placeOrder.execute(input);
    const output = await placeOrder.execute(input);
    expect(output.code).toBe("202100000002");
  });

  test("Should make a order calculating taxes", async () => {
    const input = {
      cpf: "778.278.412-36",
      zipcode: "37800-000",
      items: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
        { id: 3, quantity: 3 },
      ],
      coupon: "VALE20",
    };
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(5982);
    expect(output.taxes).toBe(1054.5);
  });

  test("Should not be possible to order an item without stock ", async () => {
    const input = {
      cpf: "778.278.412-36",
      zipcode: "37800-000",
      items: [{ id: 1, quantity: 12 }],
      coupon: "VALE20",
    };
    await expect(placeOrder.execute(input)).rejects.toThrow(new Error("Out of stock"));
  });
});
