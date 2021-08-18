import Coupon from "../../src/domain/entity/Coupon";
import Order from "../../src/domain/entity/Order";

describe("Order", () => {
  test("Should do not create order with invalid CPF", () => {
    const cpf = "111.111.111-11";
    expect(() => new Order(cpf)).toThrow(new Error("Invalid CPF"));
  });

  test("Should create a order with 3 items", () => {
    const cpf = "778.278.412-36";
    const order = new Order(cpf);
    order.addItem("1", 1000, 2);
    order.addItem("2", 5000, 1);
    order.addItem("3", 30, 3);
    const total = order.getTotal();
    expect(total).toBe(7090);
  });

  test("Should create a order with discount coupon", () => {
    const cpf = "778.278.412-36";
    const order = new Order(cpf);
    order.addItem("1", 1000, 2);
    order.addItem("2", 5000, 1);
    order.addItem("3", 30, 3);
    order.addCoupon(new Coupon("VALE20", 20, new Date("2021-10-10")));
    const total = order.getTotal();
    expect(total).toBe(5672);
  });

  test("Should create a order with discount coupon expired", () => {
    const cpf = "778.278.412-36";
    const order = new Order(cpf);
    order.addItem("1", 1000, 2);
    order.addItem("2", 5000, 1);
    order.addItem("3", 30, 3);
    order.addCoupon(new Coupon("VALE20", 20, new Date("2020-10-10")));
    const total = order.getTotal();
    expect(total).toBe(7090);
  });

  test("Should create a order calculating the code", () => {
    const cpf = "778.278.412-36";
    const order = new Order(cpf, new Date("2021-10-10"), 2);
    order.addItem("1", 1000, 2);
    order.addItem("2", 5000, 1);
    order.addItem("3", 30, 3);
    order.addCoupon(new Coupon("VALE20", 20, new Date("2020-10-10")));
    expect(order.code).toBe("202100000002");
  });
});
