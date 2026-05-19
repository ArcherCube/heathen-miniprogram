import { create } from 'zustand';
import { UserInfo } from '@/types/user';

type UserStoreData = {
  userInfo?: UserInfo;
};

type UserStoreMethod = {
  login: (loginInfo: { username: string; password: string }) => Promise<UserInfo>;
};

export type UserStore = UserStoreData & UserStoreMethod;

export const useUser = create<UserStore>()((set) => {
  return {
    userInfo: undefined,
    //method
    login: (loginInfo) => {
      console.log(`模拟登录，username: ${loginInfo.username}，password: ${loginInfo.password}`);
      return new Promise<UserInfo>((resolve) => {
        setTimeout(() => {
          const userInfo: UserInfo = {
            name: 'world',
          };

          set({
            userInfo,
          });

          resolve(userInfo);
        }, 1234);
      });
    },
  };
});
