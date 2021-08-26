import PostgresRepositoryFactory from "./infra/factory/PostgresRepositoryFactory";
import ExpressHttp from "./infra/http/ExpressHttp";
import RoutesConfig from "./infra/http/RoutesConfig";

const http = new ExpressHttp();
const databaseRepositoryFactory = new PostgresRepositoryFactory();
const routesConfig = new RoutesConfig(http, databaseRepositoryFactory);
routesConfig.build();
http.listen(3000);
