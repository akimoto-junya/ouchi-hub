import { useState, Dispatch, SetStateAction, ReactNode } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';

import DrawerAppBar from './DrawerAppBar';
import { AudioPlayer, AudioPlayerProvider} from 'features/Player';

// Header の有無による空白
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function PageWrapper() {
  const [visibleHeader, setVisibleHeader] = useState<boolean>(true);
  const [header, setHeader] = useState<ReactNode>(<></>);

  return (
    <div>
      <DrawerAppBar visible={visibleHeader} header={header} />
      <Collapse in={visibleHeader}><Offset /></Collapse>
      <AudioPlayerProvider>
        <main>
          <Outlet context={{ setVisibleHeader, setHeader }} />
        </main>
        <AudioPlayer />
      </AudioPlayerProvider>
    </div>
  );
}

type OutletProps = {
  setVisibleHeader: Dispatch<SetStateAction<boolean>>;
  setHeader: Dispatch<SetStateAction<ReactNode>>;
};

export function usePageWrapperSetters() {
  return useOutletContext<OutletProps>();
}

export default PageWrapper;
