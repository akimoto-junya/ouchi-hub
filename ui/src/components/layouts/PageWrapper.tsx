import React, { useState, Dispatch, SetStateAction } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';

import DrawerAppBar from './DrawerAppBar';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function PageWrapper() {
  const [visibleHeader, setVisibleHeader] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');

  return (
    <div>
      <DrawerAppBar visible={visibleHeader} title={title} />
      <Collapse in={visibleHeader}>
        <Offset />
      </Collapse>
      <main>
        <Outlet context={{ setVisibleHeader, setTitle }} />
      </main>
    </div>
  );
}

type OutletProps = {
  setVisibleHeader: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
};

export function useSetters() {
  return useOutletContext<OutletProps>();
}

export default PageWrapper;
