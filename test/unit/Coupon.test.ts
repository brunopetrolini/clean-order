import Coupon from "../../src/domain/entity/Coupon";

describe("Coupon", () => {
  test("Should check if the coupon is expired", () => {
    const coupon = new Coupon("VALE20", 20, new Date("2020-10-10"));
    expect(coupon.isExpired()).toBeTruthy();
  });
});
