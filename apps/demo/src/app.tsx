import '@heathen/polyfill';
import './app.css';
import { useMiddleware } from './middleware';
import { RootProvider } from './root-provider';
// 以下引入保持在最后
import './tailwind.css';

const App: React.FC<React.PropsWithChildren> = (props) => {
  useMiddleware();

  return <RootProvider>{props.children}</RootProvider>;
};

export default App;
