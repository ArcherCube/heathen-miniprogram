import { IMAGE_OSS_URL } from '@/constants/oss';
import { ConfigProvider } from '@heathen/components';
import '@heathen/polyfill';
import './app.css';
// 以下引入保持在最后
import './tailwind.css';

const App: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <>
      <ConfigProvider
        config={{
          imageSrcPrefix: IMAGE_OSS_URL,
        }}
      >
        {props.children}
      </ConfigProvider>
    </>
  );
};

export default App;
