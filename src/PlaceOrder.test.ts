import PlaceOrder from "./PlaceOrder";

describe("PlaceOrder", () => {
  test("Should make a order ", () => {
    const input = {
      cpf: "778.278.412-36",
      items: [
        { id: "1", quantity: 2 },
        { id: "2", quantity: 1 },
        { id: "3", quantity: 3 },
      ],
      coupon: "VALE20",
    };
    const placeOrder = new PlaceOrder();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(5672);
  });

  test("Should make a order with expired coupon", () => {
    const input = {
      cpf: "778.278.412-36",
      items: [
        { id: "1", quantity: 2 },
        { id: "2", quantity: 1 },
        { id: "3", quantity: 3 },
      ],
      coupon: "VALE20_EXPIRED",
    };
    const placeOrder = new PlaceOrder();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(7090);
  });
});
