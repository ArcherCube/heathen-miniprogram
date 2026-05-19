import { useEffect } from 'react';
import { Page, View } from '@heathen/components';
import { useIndexRelaunch } from './use-index-relaunch';
import { usePageReady } from './use-page-ready';

export default Page(() => {
  const { pageReady } = usePageReady();
  const { relaunch } = useIndexRelaunch();

  useEffect(() => {
    if (pageReady) {
      relaunch();
    }
  }, [relaunch, pageReady]);

  return (
    <>
      <View>loading...</View>
    </>
  );
});
