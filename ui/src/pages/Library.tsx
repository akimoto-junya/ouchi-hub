import { useEffect } from 'react';
import { WorkList } from 'features/Library';
import { styled } from '@mui/material/styles';
import { usePageWrapperInfo } from 'components/layouts/PageWrapper';

// Header の有無による空白
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function Library() {
  const { setVisibleHeader, setHeader } = usePageWrapperInfo();

  useEffect(() => {
    setVisibleHeader(true);
    setHeader(<div>ライブラリ</div>);
  }, [setVisibleHeader, setHeader]);

  return (
    <div style={{height: "100vh", display: "flex", flexDirection: "column"}}>
      <Offset />
      <WorkList />
    </div>
  );
}

export default Library;
