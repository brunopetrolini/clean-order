import GetOrder from "../../application/get-order/GetOrder";
import PlaceOrder from "../../application/place-order/PlaceOrder";
import DatabaseRepositoryFactory from "../../domain/factory/DatabaseRepositoryFactory";
import ZipcodeCalculatorAPIMemory from "../gateway/memory/ZipcodeCalculatorAPIMemory";
import Http from "./Http";

export default class RoutesConfig {
  constructor(
    private readonly http: Http,
    private readonly databaseRepositoryFactory: DatabaseRepositoryFactory
  ) {}

  build() {
    this.http.on("get", "/orders/${code}", async (params: any, body: any) => {
      const getOrder = new GetOrder(this.databaseRepositoryFactory);
      const order = await getOrder.execute(params.code);
      return order;
    });

    this.http.on("get", "/orders/${code}", async (params: any, body: any) => {
      const getOrder = new PlaceOrder(
        this.databaseRepositoryFactory,
        new ZipcodeCalculatorAPIMemory()
      );
      const order = await getOrder.execute(body);
      return order;
    });
  }
}
