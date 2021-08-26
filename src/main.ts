import ExpressHttp from "./infra/http/ExpressHttp";
import RoutesConfig from "./infra/http/RoutesConfig";

const http = new ExpressHttp();
const routesConfig = new RoutesConfig(http);
routesConfig.build();
http.listen(3000);
