import { Router } from './router';

export { NoPageException } from './exception';
export { execMiddlewares, getMiddlewares, registerMiddleware, registerMiddlewares } from './middleware';
export { NavigateType, Router } from './router';
export { registerRouterBackListener } from './router-back-listener';

export type { Middleware, MiddlewareCondition, RouteContext } from './middleware';
export type { NavigateOptions, Route } from './router';
export type { RouterBackListener } from './router-back-listener';

export default Router;
