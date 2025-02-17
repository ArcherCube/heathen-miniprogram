export class JSONUtil {
  public static parse = <T extends Record<string, any>>(str: string) => {
    try {
      return JSON.parse(str) as T;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };
}
