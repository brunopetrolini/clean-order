import DatabaseRepositoryFactory from "../../domain/factory/DatabaseRepositoryFactory";
import ZipcodeCalculatorAPI from "../../domain/gateway/ZipcodeCalculatorAPI";
import OrderService from "../../domain/service/OrderService";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";

export default class PlaceOrder {
  zipcodeCalculator: ZipcodeCalculatorAPI;
  databaseRepositoryFactory: DatabaseRepositoryFactory;

  constructor(
    databaseRepositoryFactory: DatabaseRepositoryFactory,
    zipcodeCalculator: ZipcodeCalculatorAPI
  ) {
    this.databaseRepositoryFactory = databaseRepositoryFactory;
    this.zipcodeCalculator = zipcodeCalculator;
  }

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const orderService = new OrderService(
      this.databaseRepositoryFactory,
      this.zipcodeCalculator
    );
    const order = await orderService.create(input);
    const total = order.getTotal();
    return {
      code: order.code.value,
      taxes: order.taxes,
      total,
      freight: order.freight,
    };
  }
}
