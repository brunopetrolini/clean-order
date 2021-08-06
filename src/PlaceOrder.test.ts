import PlaceOrder from "./PlaceOrder";

describe("PlaceOrder", () => {
  test("Should make a order ", () => {
    const input = {
      cpf: "778.278.412-36",
      items: [
        { description: "Guitarra", price: 1000, quantity: 2 },
        { description: "Amplificador", price: 5000, quantity: 1 },
        { description: "Cabo", price: 30, quantity: 3 },
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
        { description: "Guitarra", price: 1000, quantity: 2 },
        { description: "Amplificador", price: 5000, quantity: 1 },
        { description: "Cabo", price: 30, quantity: 3 },
      ],
      coupon: "VALE20_EXPIRED",
    };
    const placeOrder = new PlaceOrder();
    const output = placeOrder.execute(input);
    expect(output.total).toBe(7090);
  });
});