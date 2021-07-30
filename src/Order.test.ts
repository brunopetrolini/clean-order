import Order from "./Order";

describe("Order", () => {
  test("Should do not create order with invalid CPF", () => {
    const cpf = "111.111.111-11";
    expect(() => new Order(cpf)).toThrow(new Error("Invalid CPF"));
  });
});
