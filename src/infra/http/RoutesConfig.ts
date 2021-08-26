import GetOrder from "../../application/GetOrder";
import DatabaseRepositoryFactory from "../../domain/factory/DatabaseRepositoryFactory";
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
  }
}
