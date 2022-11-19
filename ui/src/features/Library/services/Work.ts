import { WorkInfo } from '../types';

export const groupBy = (works: WorkInfo[], key: (obj: WorkInfo) => string): Map<string, WorkInfo[]> => {
  const result = new Map<string, WorkInfo[]>();

  works.forEach((work) => {
    const k = key(work);
    if (result.get(k) === undefined) {
      result.set(k, []);
    }
    result.get(k)!.push(work);
  });

  return result;
};
