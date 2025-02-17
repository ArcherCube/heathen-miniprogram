import '@tarojs/taro';

type Options = {
  style: React.CSSProperties & { cssText: string };
  /** 接口调用结束的回调函数（调用成功、失败都会执行） */
  complete?: (res: TaroGeneral.CallbackResult) => void;
  /** 接口调用失败的回调函数 */
  fail?: (res: TaroGeneral.CallbackResult) => void;
  /** 接口调用成功的回调函数 */
  success?: (res: TaroGeneral.CallbackResult) => void;
};

declare module '@tarojs/taro' {
  interface TaroStatic {
    /**
     * 设置page节点的style。
     * - 官方没有公开这个api。
     */
    setPageStyle: (options: Options) => void;
  }
}
