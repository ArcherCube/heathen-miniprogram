import Router from '@heathenjs/taro-router';
import { NavigationBar, Page, View } from '@heathen/components';
import { Params } from './route.config';

export default Page(() => {
  const params: Params = Router.useParams();

  return (
    <>
      <NavigationBar>订单列表：</NavigationBar>
      <View>
        <View>params.type: {params.type}</View>
      </View>
    </>
  );
});
