import { IMAGE_OSS_URL } from '@/constants/oss';
import { useTheme } from '@/store/theme';
import { ConfigProvider } from '@heathen/components';
import '@heathen/polyfill';
import { useApplyTheme } from '@heathen/theme';
import './app.css';
// 以下引入保持在最后
import './tailwind.css';

const App: React.FC<React.PropsWithChildren> = (props) => {
  // 应用主题
  const { theme } = useTheme();
  useApplyTheme(theme);

  return (
    <>
      <ConfigProvider
        config={{
          Image: {
            imageSrcPrefix: IMAGE_OSS_URL,
          },
        }}
      >
        {props.children}
      </ConfigProvider>
    </>
  );
};

export default App;
