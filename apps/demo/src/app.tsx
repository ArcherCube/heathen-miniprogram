import '@heathen/polyfill';
import './app.css';
import { RootProvider } from './root-provider';
// 以下引入保持在最后
import './tailwind.css';

const App: React.FC<React.PropsWithChildren> = (props) => {
  return <RootProvider>{props.children}</RootProvider>;
};

export default App;
