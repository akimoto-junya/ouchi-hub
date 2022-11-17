import { FC } from 'react';
import styles from '../styles/File.module.css';

type Props = {
  name: string;
  fileType: string;
  imageURL: string;
  onClick: () => void;
}


const File: FC<Props> = ({name, fileType, imageURL, onClick}) => {
  return (
    <li className={styles.item} onClick={onClick}>
      <img src={imageURL} alt={fileType} loading="lazy" className={styles["item-type"]} />
      <div className={styles["item-detail"]}>
        <div className={styles.name}>{name}</div>
        <div className={styles.supplement}></div>
      </div>
    </li>
  )
};

export default File;
