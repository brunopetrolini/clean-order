import GetOrder from "../../application/GetOrder";
import PostgresRepositoryFactory from "../factory/PostgresRepositoryFactory";
import Http from "./Http";

export default class RoutesConfig {
  http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  build() {
    this.http.on("get", "/orders/${code}", async (params: any, body: any) => {
      const getOrder = new GetOrder(new PostgresRepositoryFactory());
      const order = await getOrder.execute(params.code);
      return order;
    });
  }
}
