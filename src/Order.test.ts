import Coupon from "./Coupon";
import Order from "./Order";

describe("Order", () => {
  test("Should do not create order with invalid CPF", () => {
    const cpf = "111.111.111-11";
    expect(() => new Order(cpf)).toThrow(new Error("Invalid CPF"));
  });

  test("Should create a order with 3 items", () => {
    const cpf = "778.278.412-36";
    const order = new Order(cpf);
    order.addItem("Guitarra", 1000, 2);
    order.addItem("Amplificador", 5000, 1);
    order.addItem("Cabo", 30, 3);
    const total = order.getTotal();
    expect(total).toBe(7090);
  });

  test("Should create a order with discount coupon", () => {
    const cpf = "778.278.412-36";
    const order = new Order(cpf);
    order.addItem("Guitarra", 1000, 2);
    order.addItem("Amplificador", 5000, 1);
    order.addItem("Cabo", 30, 3);
    order.addCoupon(new Coupon("VALE20", 20, new Date("2021-10-10")));
    const total = order.getTotal();
    expect(total).toBe(5672);
  });
});
