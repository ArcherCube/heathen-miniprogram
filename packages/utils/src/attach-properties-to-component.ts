/** 给指定对象增加属性，一般用于组件 */
export const attachPropertiesToComponent = <B, T extends Record<string, any>>(component: B, properties: T): B & T => {
  const result = component as any;
  for (const key in properties) {
    // eslint-disable-next-line no-prototype-builtins
    if (properties.hasOwnProperty(key)) {
      result[key] = properties[key];
    }
  }
  return result;
};
