import { useState, useEffect } from 'react';
import { WorkList, Work } from '../types';
import { getWorks, updateWorks } from '../api';

const useWorks = () => {
  const [works, setWorks] = useState<Work[]>([]);

  const get = () => {
    getWorks().then((result) => setWorks((result as WorkList).works));
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
