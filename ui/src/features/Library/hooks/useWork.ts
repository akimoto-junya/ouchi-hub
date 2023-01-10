import { useState, useEffect } from 'react';
import { WorkInfo } from '../types';
import { getWork } from '../api';

const useWork = (media: string, group: string, tree: string) => {
  const [work, setWork] = useState<WorkInfo>();

  const get = () => {
    getWork(media, group, tree).then((result) => {
      result.tree = result.tree?.sort((a, b) => {
        const pa = a.name.replace(/(\d+)/g, (m) => m.padStart(15, '0'));
        const pb = b.name.replace(/(\d+)/g, (m) => m.padStart(15, '0'));
        return pa > pb ? 1 : pa < pb ? -1 : 0;
      });
      setWork(result);
    });
  };

  useEffect(() => {
    get();
  }, [media, group, tree]);

  return work;
};

export default useWork;
