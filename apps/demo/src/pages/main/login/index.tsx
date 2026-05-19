import Router, { NavigateType } from '@heathenjs/taro-router';
import { useMemoizedFn, useRequest } from 'ahooks';
import { Button, Form, Input, NavigationBar, Page, Toast, View } from '@heathen/components';
import { wait } from '@heathen/utils';
import { useUser } from '@/store/user';

export default Page(() => {
  const { login } = useUser();
  const { runAsync: doLogin, loading: loginLoading } = useRequest(login, { manual: true });

  const handleSubmit = useMemoizedFn((values: { username: string; password: string }) => {
    return doLogin(values)
      .then(() => {
        Toast.success('登录成功');
        return wait(1000);
      })
      .then(() => {
        return Router.shop.toHome({
          params: {
            type: 'all',
          },
          type: NavigateType.reLaunch,
        });
      });
  });

  const handleTest = useMemoizedFn(() => {
    Router.shop.toHome();
  });

  return (
    <>
      <NavigationBar>登录</NavigationBar>
      <View className='p-12'>
        <Form onFinish={handleSubmit} disabled={loginLoading}>
          <Form.Item label='用户名' name='username' rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder='请输入用户名' />
          </Form.Item>
          <Form.Item label='密码' name='password' rules={[{ required: true, message: '请输入密码' }]}>
            <Input placeholder='请输入密码' type='safe-password' />
          </Form.Item>
          <Button className='mt-12 w-full' formType='submit' loading={loginLoading}>
            登录
          </Button>
          <Button className='bg-error-6 mt-12 w-full' onClick={handleTest}>
            尝试未登录进入商城
          </Button>
        </Form>
      </View>
    </>
  );
});
