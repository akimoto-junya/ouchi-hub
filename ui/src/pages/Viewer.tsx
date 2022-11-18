import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePageWrapperSetters } from 'components/layouts/PageWrapper';
import { Box } from '@mui/material';

function Viewer() {
  const { setVisibleHeader, setHeader } = usePageWrapperSetters();
  const navigate = useNavigate();
  const [hover, setHover] = useState(0);

  const params = useParams() as {
    media: string;
    group: string;
    tree: string;
    "*": string | undefined;
  };

  const media = params.media;
  const group = params.group;
  let tree = params.tree;

  if (typeof params["*"] !== "undefined") {
    tree += "%2F" + params["*"].replaceAll('/', '%2F');
  }

  useEffect(() => {
    setVisibleHeader(true);
    setHeader(
      <div onClick={() => navigate('../')} style={{cursor: "pointer", width: "max-content"}}>＜  戻る</div>
    );
  }, [setVisibleHeader, setHeader]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleHeader(false);
    }, 2000);
    return () => {
      setVisibleHeader(true);
      clearTimeout(timer);
    }
  }, [hover])



  return (
    <>
      <div onPointerOver={() => setHover(hover + 1)} style={{position: "fixed", width: "100%", height: "100px", top: "0"}}></div>
    </>
  );
}

export default Viewer;
