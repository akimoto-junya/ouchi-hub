import { useEffect } from 'react';
import { useSetters } from 'components/layouts/PageWrapper';

function Work() {
  const { setVisibleHeader, setTitle } = useSetters();

  useEffect(() => {
    setVisibleHeader(true);
    setTitle('work');
  }, [setVisibleHeader, setTitle]);

  return <div></div>;
}

export default Work;
