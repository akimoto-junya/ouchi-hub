import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePageWrapperSetters } from 'components/layouts/PageWrapper';
import { Filer } from 'features/Library';

function Work() {
  const { setVisibleHeader, setHeader } = usePageWrapperSetters();
  const navigate = useNavigate();

  useEffect(() => {
    setVisibleHeader(true);
    setHeader(
      <div onClick={() => navigate('../')} style={{fontWeight: "bold", cursor: "pointer", width: "max-content"}}>＜  戻る</div>
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
    <>
      <Filer media={media} group={group} tree={tree} />
    </>
  );
}

export default Work;
