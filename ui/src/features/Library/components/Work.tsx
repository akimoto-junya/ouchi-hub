import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Color } from 'chroma-js';
import { Work as WorkType } from '../types';
import styles from '../styles/Work.module.css';
import ContainedImage from 'components/elements/ContainedImage';

type Props = {
  work: WorkType;
  mediaColor: Color;
};

const Work: FC<Props> = ({ work: { title, group, media, imageURL }, mediaColor }) => {
  const navigate = useNavigate();
  const toWorkPage = () => {
    navigate('/work');
  };
  return (
    <li className={styles.work ?? ''} onClick={toWorkPage}>
      <ContainedImage src={imageURL} alt={title} className={styles.thumbnail} />
      <div className={styles['work-detail']}>
        <div className={styles.title}>{title}</div>
        <div className={styles.supplement}>
          <div className={styles.group}>{group}</div>
          <div className={styles['media-type']} style={{ background: mediaColor.css('hsl') }}>
            {media}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Work;
