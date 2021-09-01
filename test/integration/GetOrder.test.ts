import GetOrder from "../../src/application/get-order/GetOrder";
import PlaceOrder from "../../src/application/place-order/PlaceOrder";
import DatabaseRepositoryFactory from "../../src/domain/factory/DatabaseRepositoryFactory";
import ZipcodeCalculatorAPI from "../../src/domain/gateway/ZipcodeCalculatorAPI";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory";

describe("GetOrder", () => {
  let zipcodeCalculator: ZipcodeCalculatorAPI;
  let placeOrder: PlaceOrder;
  let getOrder: GetOrder;
  let databaseRepositoryFactory: DatabaseRepositoryFactory;

  beforeEach(() => {
    databaseRepositoryFactory = new MemoryRepositoryFactory();
    zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    placeOrder = new PlaceOrder(databaseRepositoryFactory, zipcodeCalculator);
    getOrder = new GetOrder(databaseRepositoryFactory);
  });

  test("Should to get a purchase order", async () => {
    const input = {
      cpf: "778.278.412-36",
      zipcode: "37800-000",
      items: [
        { id: "1", quantity: 2 },
        { id: "2", quantity: 1 },
        { id: "3", quantity: 3 },
      ],
      coupon: "VALE20",
    };
    const output = await placeOrder.execute(input);
    const getOrderOutput = await getOrder.execute(output.code);
    expect(getOrderOutput.total).toBe(5982);
  });
});
