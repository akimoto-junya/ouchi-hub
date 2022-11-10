import { useEffect } from 'react';
import { WorkList } from 'features/Library';
import { AudioPlayer } from 'features/Player';
import { useSetters } from 'components/layouts/PageWrapper';

function Library() {
  const { setVisibleHeader, setTitle } = useSetters();

  useEffect(() => {
    setVisibleHeader(true);
    setTitle('Library');
  }, [setVisibleHeader, setTitle]);

  return (
    <>
      <AudioPlayer />
      <WorkList />
    </>
  );
}

export default Library;
