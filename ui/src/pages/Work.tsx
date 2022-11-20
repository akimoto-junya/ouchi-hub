import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { usePageWrapperInfo } from 'components/layouts/PageWrapper';
import { Filer } from 'features/Library';

// Header の有無による空白
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function Work() {
  const { setVisibleHeader, setHeader } = usePageWrapperInfo();
  const navigate = useNavigate();

  useEffect(() => {
    setVisibleHeader(true);
    setHeader(
      <div onClick={() => navigate(-1)} style={{cursor: "pointer", width: "max-content"}}>＜  戻る</div>
    );
  }, [setVisibleHeader, setHeader]);

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

  return (
    <div style={{height: "100vh", display: "flex", flexDirection: "column"}}>
      <Offset />
      <Filer media={media} group={group} tree={tree} />
    </div>
  );
}

export default Work;
