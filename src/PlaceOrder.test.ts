import CouponRepositoryMemory from "./CouponRepositoryMemory";
import ItemRepositoryMemory from "./ItemRepositoryMemory";
import OrderRepositoryMemory from "./OrderRepositoryMemory";
import PlaceOrder from "./PlaceOrder";

describe("PlaceOrder", () => {
  let orderRepository: OrderRepositoryMemory;
  let itemRepository: ItemRepositoryMemory;
  let couponRepository: CouponRepositoryMemory;
  let placeOrder: PlaceOrder;

  beforeAll(() => {
    orderRepository = new OrderRepositoryMemory();
    itemRepository = new ItemRepositoryMemory();
    couponRepository = new CouponRepositoryMemory();
    placeOrder = new PlaceOrder(
      orderRepository,
      itemRepository,
      couponRepository
    );
  });

  test("Should make a order ", () => {
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
    const output = placeOrder.execute(input);
    expect(output.total).toBe(5982);
  });

  test("Should make a order with expired coupon", () => {
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
    const output = placeOrder.execute(input);
    expect(output.total).toBe(7400);
  });

  test("Should make a order with freight calculation", () => {
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
    const output = placeOrder.execute(input);
    expect(output.freight).toBe(310);
  });
});
