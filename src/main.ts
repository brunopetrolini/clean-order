import HapiHttp from "./infra/http/HapiHttp";
import RoutesConfig from "./infra/http/RoutesConfig";

// const http = new ExpressHttp();
const http = new HapiHttp();
const routesConfig = new RoutesConfig(http);
routesConfig.build();
http.listen(3000);
