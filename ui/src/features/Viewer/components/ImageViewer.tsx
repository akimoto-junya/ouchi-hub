import { FC } from "react";
import { MediaAddress } from "utils/api";
import styles from '../styles/ImageViewer.module.css';

type Props = {
  media: string;
  group: string;
  tree: string;
};

const ImageViewer: FC<Props> = ({media, group, tree}) => {
  console.log([MediaAddress, media, group, tree].join('/'))
  return (
    <>
      <img src={[MediaAddress, media, group, tree].join('/')} alt="" className={styles.image} />
    </>
  );
};


export default ImageViewer;
