import { RouteConfig } from "./route-config";

export class RoutesUtil {
  static Home = new RouteConfig('home');

  // static Auth = new RouteConfig('auth');
  static AuthLogin = new RouteConfig('login', RoutesUtil.Home);

  static Dashboard = new RouteConfig('dashboard');
}
