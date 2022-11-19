import { useState, useEffect } from 'react';
import { Color } from 'chroma-js';
import { genUniqueColors, White } from 'utils/helper';
import Work from './WorkItem';
import styles from '../styles/WorkList.module.css';
import { useWorks } from '../hooks';
import { groupBy } from '../services';
import { WorkInfo } from '../types';

function WorkList() {
  const [works, _] = useWorks();
  const [groups, setGroups] = useState<Map<string, WorkInfo[]>>(new Map());
  const [mediaColors, setMediaColors] = useState<Map<string, Color>>(new Map());

  useEffect(() => {
    // media の色を設定
    const getUniqueColor = genUniqueColors();
    const colors = new Map<string, Color>();
    works.forEach((work) => {
      if (colors.get(work.media) === undefined) {
        colors.set(work.media, getUniqueColor.next().value);
      }
    });
    setMediaColors(colors);

    setGroups(groupBy(works, (w) => w.group));
  }, [works]);

  return (
    <ul className={styles['container']}>
      {Array.from(groups.entries()).map(([group, works]) => {
        return (
          <li key={group} className={styles['group']}>
            <div className={styles['group-name-wrapper']}>
              <div className={styles['group-name']}>{group}</div>
            </div>
            <ul className={styles['group-contents']}>
              {works.map((work, index) => {
                return <Work key={index} work={work} mediaColor={mediaColors.get(work.media) ?? White} />;
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

export default WorkList;
