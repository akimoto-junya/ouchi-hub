import { WorkInfo, WorkInfoList } from '../types';
import { APIAddress } from 'utils/api';

const worksURL = new URL('works', APIAddress);
const workURL = (media: string, group: string, tree: string) => {
  const url = new URL(`works/${tree}`, APIAddress);
  url.search = new URLSearchParams({ media: media, group: group }).toString();
  return url;
};

export const getWorks = async () => {
  const response = await fetch(worksURL, {
    mode: 'cors',
  });
  const works = await response.json();
  return works as WorkInfoList;
};

export const updateWorks = () => {
  fetch(worksURL, {
    mode: 'cors',
    method: 'PUT',
  });
};

export const getWork = async (media: string, group: string, tree: string) => {
  const response = await fetch(workURL(media, group, tree), {
    mode: 'cors',
  });
  const work = await response.json();
  return work as WorkInfo;
};
