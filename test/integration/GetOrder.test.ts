import GetOrder from "../../src/application/GetOrder";
import PlaceOrder from "../../src/application/PlaceOrder";
import ZipcodeCalculatorAPI from "../../src/domain/gateway/ZipcodeCalculatorAPI";
import CouponRepository from "../../src/domain/repository/CouponRepository";
import ItemRepository from "../../src/domain/repository/ItemRepository";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import Database from "../../src/infra/database/Database";
import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase";
import ZipcodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipcodeCalculatorAPIMemory";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";

describe("GetOrder", () => {
  let pgPromiseDatabase: Database;
  let itemRepository: ItemRepository;
  let couponRepository: CouponRepository;
  let orderRepository: OrderRepository;
  let zipcodeCalculator: ZipcodeCalculatorAPI;
  let placeOrder: PlaceOrder;
  let getOrder: GetOrder;

  beforeEach(() => {
    pgPromiseDatabase = PgPromiseDatabase.getInstance();
    itemRepository = new ItemRepositoryDatabase(pgPromiseDatabase);
    couponRepository = new CouponRepositoryDatabase(pgPromiseDatabase);
    orderRepository = new OrderRepositoryDatabase(pgPromiseDatabase);
    zipcodeCalculator = new ZipcodeCalculatorAPIMemory();
    placeOrder = new PlaceOrder(
      orderRepository,
      itemRepository,
      couponRepository,
      zipcodeCalculator
    );
    getOrder = new GetOrder(orderRepository, itemRepository);
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
