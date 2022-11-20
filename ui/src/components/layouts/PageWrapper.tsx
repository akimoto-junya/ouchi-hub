import { useState, Dispatch, SetStateAction, ReactNode } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import DrawerAppBar from './DrawerAppBar';
import { AudioPlayer, AudioPlayerProvider} from 'features/Player';

function PageWrapper() {
  const [visibleHeader, setVisibleHeader] = useState<boolean>(true);
  const [header, setHeader] = useState<ReactNode>(<></>);

  return (
    <>
      <DrawerAppBar visible={visibleHeader} header={header} />
      <AudioPlayerProvider>
        <main>
          <Outlet context={{ setVisibleHeader, setHeader }} />
        </main>
        <AudioPlayer />
      </AudioPlayerProvider>
    </>
  );
}

type OutletProps = {
  setVisibleHeader: Dispatch<SetStateAction<boolean>>;
  setHeader: Dispatch<SetStateAction<ReactNode>>;
};

export function usePageWrapperInfo() {
  return useOutletContext<OutletProps>();
}

export default PageWrapper;
