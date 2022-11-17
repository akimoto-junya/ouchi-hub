import { NavigateFunction, useNavigate } from 'react-router-dom';
import { getFileType, getSourceURL, isAudioType, isDirectoryType } from '../services';
import { WorkInfo } from '../types';
import { Media, AudioQueue } from 'features/Player/types';

type ClickWorkProps = {
  fileType: string;
  filename: string;
};

const convertTo = (audioFiles: string[], media: string, group: string, album: string, imageURL: string): Media[] => {
  return audioFiles.map((filename) => {
    return {
      url: getSourceURL(media, group, filename),
      title: filename,
      group: group,
      album: album,
      artworkUrl: imageURL,
    } as Media;
  }) as Media[];
};

const searchOnSet = (audioFiles: string[], target?: string): number | undefined => {
  if (typeof target === 'undefined') return undefined;
  return audioFiles.indexOf(target);
};

const ClickAudioItem = (work: WorkInfo, filename: string, audioQueue: AudioQueue) => {
  return () => {
    const audioFiles = work.tree.filter((item) => isAudioType(getFileType(item.name))).map((item) => item.name);
    audioQueue.control.setSources(
      convertTo(audioFiles, work.media, work.group, work.title, work.imageURL),
      searchOnSet(audioFiles, filename),
    );
    audioQueue.control.play();
  };
};

const useClickWorkBehavior = (work?: WorkInfo, audioQueue?: AudioQueue) => {
  const navigate = useNavigate();
  if (typeof work === 'undefined' || typeof navigate === 'undefined' || typeof audioQueue === 'undefined') {
    return ({}: ClickWorkProps) =>
      () => {};
  }

  return ({ fileType, filename }: ClickWorkProps): (() => void) => {
    if (isDirectoryType(fileType)) {
      return () => {
        navigate(filename ?? '');
      };
    } else if (isAudioType(fileType)) {
      return ClickAudioItem(work, filename, audioQueue);
    }
    return () => {};
  };
};

export default useClickWorkBehavior;
