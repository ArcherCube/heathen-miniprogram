import { getPageId } from '@heathen/utils';

export class AdditionalElementManager {
  /**
   * 全局管理页面额外节点
   * - 正常情况下，一个页面的（额外）节点在组件内部管理即可
   * - 但是如果需要在任意时刻能随时给当前页面增加/删除额外节点，就需要提升到全局
   * - 提升到全局后，则需要一个forceUpdate功能，让这些全局变量变化后能执行更新
   * - 又因为小程序本身是个多页面架构，每个页面可以同时存在且额外节点都不一样，就需要用map存储这些内容，key为$taroPath（自带时间戳，可以解决重复进入同一个页面的场景）
   */
  private static readonly manager = new Map<string, AdditionalElementManager>();

  private elementMap: Map<string, React.ReactElement>;
  private update: () => void;
  private readonly pageId = getPageId();

  /** 创建属于当前页面的额外元素管理器 */
  constructor() {
    this.elementMap = new Map<string, React.ReactElement>();
    this.update = () => {
      console.warn('[AdditionalElementManager]: 请先注册额外元素管理器');
    };
  }

  /**
   * 注册管理器
   * @param updateFn - 用于更新页面的函数
   */
  public reigster(updateFn: () => void): void {
    if (this.pageId) {
      if (this.pageId) {
        this.update = updateFn;
        AdditionalElementManager.manager.set(this.pageId, this);
      } else {
        console.warn('[AdditionalElementManager]: 当前页面未找到，无法创建额外元素管理器');
        this.update = () => {
          console.warn('[AdditionalElementManager]: 当前页面未找到，额外元素管理器未创建');
        };
      }
    }
  }

  public unRegister(): void {
    if (this.pageId) {
      this.update = () => {
        console.warn(`[AdditionalElementManager]: 额外元素管理器(ID: ${this.pageId})已注销`);
      };
      this.elementMap.clear();
      AdditionalElementManager.manager.delete(this.pageId);
    } else {
      console.warn('[AdditionalElementManager]: 当前页面未找到，无法注销额外元素管理器');
    }
  }

  public getElementMap(): Map<string, React.ReactElement> | undefined {
    return this.elementMap;
  }

  public updateElementMap(doUpdate: (elementMap: Map<string, React.ReactElement>) => void): void {
    doUpdate(this.elementMap);
    this.update();
  }

  public static get(pageId: string): AdditionalElementManager | undefined {
    return AdditionalElementManager.manager.get(pageId);
  }
}
