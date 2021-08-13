import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";
import Database from "../../database/Database";

export default class CouponRepositoryDatabase implements CouponRepository {
  constructor(private readonly database: Database) {}

  async getByCode(code: string): Promise<Coupon | undefined> {
    const coupon = await this.database.one(
      "select * from ccca.coupon where code = $1",
      [code]
    );
    return new Coupon(coupon.code, coupon.percentage, coupon.expire);
  }
}
