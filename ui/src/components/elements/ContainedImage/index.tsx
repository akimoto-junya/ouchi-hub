import { FC } from 'react';
import styles from './ContainedImage.module.css';

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const ContainedImage: FC<Props> = ({ src, alt, className }) => {
  return (
    <div className={className}>
      <img className={`${styles.container}`} src={src} alt="" />
    </div>
  );
};

export default ContainedImage;
