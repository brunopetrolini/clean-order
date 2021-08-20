import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";
import PlaceOrder from "../../src/application/PlaceOrder";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase";
import ItemRepository from "../../src/domain/repository/ItemRepository";
import ZipcodeCalculatorAPI from "../../src/domain/gateway/ZipcodeCalculatorAPI";
import CouponRepository from "../../src/domain/repository/CouponRepository";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import Database from "../../src/infra/database/Database";

describe("PlaceOrder", () => {
  let pgPromiseDatabase: Database;
  let itemRepository: ItemRepository;
  let couponRepository: CouponRepository;
  let orderRepository: OrderRepository;
  let zipcodeCalculator: ZipcodeCalculatorAPI;
  let placeOrder: PlaceOrder;

  beforeEach(() => {
    pgPromiseDatabase = PgPromiseDatabase.getInstance();
    itemRepository = new ItemRepositoryDatabase(pgPromiseDatabase);
    couponRepository = new CouponRepositoryMemory();
    orderRepository = new OrderRepositoryMemory();
    zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    placeOrder = new PlaceOrder(
      orderRepository,
      itemRepository,
      couponRepository,
      zipcodeCalculator
    );
  });

  test("Should make a order ", async () => {
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
    expect(output.total).toBe(5982);
  });

  test("Should make a order with expired coupon", async () => {
    const input = {
      cpf: "778.278.412-36",
      zipcode: "37800-000",
      items: [
        { id: "1", quantity: 2 },
        { id: "2", quantity: 1 },
        { id: "3", quantity: 3 },
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
        { id: "1", quantity: 2 },
        { id: "2", quantity: 1 },
        { id: "3", quantity: 3 },
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
        { id: "1", quantity: 2 },
        { id: "2", quantity: 1 },
        { id: "3", quantity: 3 },
      ],
      issueDate: new Date("2021-10-10"),
      coupon: "VALE20_EXPIRED",
    };
    await placeOrder.execute(input);
    const output = await placeOrder.execute(input);
    expect(output.code).toBe("202100000002");
  });
});
