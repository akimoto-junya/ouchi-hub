import { WorkList } from '../types';
import { APIAddress } from 'utils/api';

const worksURL = new URL('works', APIAddress);

export const getWorks = async () => {
  const response = await fetch(worksURL, {
    mode: 'cors',
  });
  const works = await response.json();
  return works as WorkList;
};

export const updateWorks = () => {
  fetch(worksURL, {
    mode: 'cors',
    method: 'PUT',
  });
};
