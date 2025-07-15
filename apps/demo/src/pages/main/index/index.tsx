import { Button, NavigationBar, Page, View } from '@heathen/components';

export default Page(() => {
  return (
    <>
      <NavigationBar>Home</NavigationBar>
      <View className='px-12'>
        <View className='text-36 font-bold'>Hello world!</View>
        <Button color='primary' className='mt-12' block>
          确定
        </Button>
      </View>
    </>
  );
});
