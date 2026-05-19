import { ENTRANCE_TYPE } from '@/constants/entrance-type';
import { RouteExt } from '@/types/route-ext';

export type Params = {
  /** 进入的类型 */
  type?: ENTRANCE_TYPE;
};

export const Ext: RouteExt = {
  noLogin: true,
};
