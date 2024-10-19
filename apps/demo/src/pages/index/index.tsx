import { NavigationBar } from '@heathen/components';
import { View } from '@tarojs/components';

const Page: React.FC = () => {
  return (
    <>
      <NavigationBar>Home</NavigationBar>
      <View className='text-36 font-bold'>Hello world!</View>
    </>
  );
};

export default Page;
