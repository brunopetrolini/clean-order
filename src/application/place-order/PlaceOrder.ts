import DatabaseRepositoryFactory from "../../domain/factory/DatabaseRepositoryFactory";
import ZipcodeCalculatorAPI from "../../domain/gateway/ZipcodeCalculatorAPI";
import OrderCreator from "../../domain/service/OrderCreator";
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
    const orderService = new OrderCreator(
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
