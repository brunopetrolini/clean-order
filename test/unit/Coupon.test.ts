import Coupon from "../../src/Coupon";

describe("Coupon", () => {
  test("Should check if the coupon is expired", () => {
    const coupon = new Coupon("VALE20", 20, new Date("2020-10-10"));
    expect(coupon.isExpired()).toBeTruthy();
  });
});
