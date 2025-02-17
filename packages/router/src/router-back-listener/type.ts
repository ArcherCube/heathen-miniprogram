import { Route } from '../router';

export type RouterBackListener = (to: Route, from: Route) => any;
