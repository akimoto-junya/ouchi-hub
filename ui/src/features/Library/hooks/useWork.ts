import { useState, useEffect } from 'react';
import { WorkInfo } from '../types';
import { getWork } from '../api';

const useWork = (media: string, group: string, tree: string) => {
  const [work, setWork] = useState<WorkInfo>();

  const get = () => {
    getWork(media, group, tree).then((result) => {
      setWork(result);
    });
  };

  useEffect(() => {
    get();
  }, [media, group, tree]);

  return work;
};

export default useWork;
