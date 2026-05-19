import { registerMiddlewares } from '@heathenjs/taro-router';
import { useMount } from 'ahooks';
import { LoginStatusMiddleware } from '@/middleware/login-status';

export const useMiddleware = () => {
  useMount(() => {
    registerMiddlewares([LoginStatusMiddleware]);
  });
};
