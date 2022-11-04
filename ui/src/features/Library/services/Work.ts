import { Work } from '../types';

export const groupBy = (works: Work[], key: (obj: Work) => string): Map<string, Work[]> => {
  const result = new Map<string, Work[]>();

  works.forEach((work) => {
    const k = key(work);
    if (result.get(k) === undefined) {
      result.set(k, []);
    }
    result.get(k)!.push(work);
  });

  return result;
};
