export type RouteExt = {
  noLogin?: boolean;
};

export const DEFAULT_ROUTE_EXT: Required<Pick<RouteExt, 'noLogin'>> = {
  noLogin: false,
};
