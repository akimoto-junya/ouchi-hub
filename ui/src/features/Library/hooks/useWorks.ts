import { useState, useEffect } from 'react';
import { WorkInfoList, WorkInfo } from '../types';
import { getWorks, updateWorks } from '../api';

const useWorks = () => {
  const [works, setWorks] = useState<WorkInfo[]>([]);

  const get = () => {
    getWorks().then((result) => setWorks((result as WorkInfoList).works));
  };

  const update = () => {
    updateWorks();
    get();
  };

  useEffect(() => {
    get();
  }, []);

  return [works, { get, update }] as const;
};

export default useWorks;
