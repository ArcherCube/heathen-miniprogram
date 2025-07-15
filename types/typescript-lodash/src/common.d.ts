/** 提取对象的必填字段 */
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * 联合类型转交叉类型
 */
type UnionToIntersection<U> = (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown ? R : never;

/**
 * 联合类型转元组
 */
type UnionToTuple<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => infer ReturnType
    ? [...UnionToTuple<Exclude<T, ReturnType>>, ReturnType]
    : [];
