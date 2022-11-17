import { useEffect } from 'react';
import { WorkList } from 'features/Library';
import { usePageWrapperSetters } from 'components/layouts/PageWrapper';

function Library() {
  const { setVisibleHeader, setHeader } = usePageWrapperSetters();

  useEffect(() => {
    setVisibleHeader(true);
    setHeader(<div>Library</div>);
  }, [setVisibleHeader, setHeader]);

  return (
    <>
      <WorkList />
    </>
  );
}

export default Library;
