import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePageWrapperInfo } from 'components/layouts/PageWrapper';
import { getFileType, isVideoType } from 'features/Library/services';
import { MediaAddress } from 'utils/api';
import ImageViewer from 'features/Viewer/components/ImageViewer';

function Viewer() {
  const navigate = useNavigate();
  const { setVisibleHeader, setHeader } = usePageWrapperInfo();
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
      <div onClick={() => navigate(-1)} style={{ cursor: "pointer", width: "max-content" }}>＜  戻る</div>
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

  const fileType = getFileType(tree);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div onPointerOver={() => setHover(hover + 1)} style={{ position: "fixed", width: "100%", height: "100px", top: "0", zIndex: 100 }}></div>
      <div style={{ overflow: "hidden", flexGrow: "1" }}>
        {isVideoType(fileType)
          ? <video src={[MediaAddress, media, group, tree].join('/')} controls autoPlay
            style={{ height: "100%", width: "100%", maxWidth: "100%", maxHeight: "100%", objectFit: "contain", margin: "auto" }}></video>
          : <ImageViewer media={media} group={group} tree={tree} />
        }
      </div>
    </div>
  );
}

export default Viewer;
