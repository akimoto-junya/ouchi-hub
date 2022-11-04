import { useState, useEffect } from 'react';
import { WorkList, Work } from '../types';
import { getWorks } from '../api';

const useWorks = () => {
  const [works, setWorks] = useState<Work[]>([]);
  useEffect(() => {
    getWorks().then((result) => setWorks((result as WorkList).works));
  }, []);
  return works;
};

export default useWorks;
