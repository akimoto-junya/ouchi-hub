import { FC, useContext } from 'react';
import File from './File';
import { useClickItemBehavior, useWork } from '../hooks';
import styles from '../styles/Filer.module.css';
import { getSourceURL, getFileImage, getFileType, isImageType } from '../services';
import { DirectoryType } from '../types';
import { AudioPlayerContext } from 'features/Player';

type Props = {
  media: string;
  group: string;
  tree: string;
};

const Filer: FC<Props> = ({ media, group, tree }) => {
  const work = useWork(media, group, tree);
  const audioPlayer = useContext(AudioPlayerContext);
  const onClick = useClickItemBehavior(work, audioPlayer);

  if (typeof work === 'undefined') {
    return <></>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.work}>
        <img src={work.imageURL} alt="" className={styles["work-thumbnail"]} />
        <div className={styles["work-detail"]}>
          <div className={styles["work-name"]}>{work.title}</div>
          <div className={styles["work-group"]}>{group}</div>
        </div>
      </div>
      <ol className={styles.group}>
        { // directory
          work.tree?.filter((item) => item.type === 'directory').map((item, index) => {
            const fileType: DirectoryType = "directory"
            return <File key={index} name={item.name}
              fileType={fileType} imageURL={getFileImage(fileType)}
              onClick={onClick({ fileType: fileType, filename: window.location.pathname + "%2F" + item.name })} />;
          }) ?? <></>
        }
        { // files
          work.tree?.filter((item) => item.type === 'file').map((item, index) => {
            const fileType = getFileType(item.name);
            const imageURL = isImageType(fileType) ? getSourceURL(media, group, item.name) : getFileImage(fileType);
            return (
              <File key={index} name={item.name}
                    fileType={fileType} imageURL={imageURL}
                    onClick={onClick({ fileType, filename: item.name })} />
            );
          }) ?? <></>
        }
      </ol>
    </div>
  );
};

export default Filer;
