import { MediaAddress } from 'utils/api';
import {
  audioExt,
  AudioType,
  ContentType,
  DirectoryType,
  imageExt,
  ImageType,
  textExt,
  TextType,
  UnknownType,
  videoExt,
  VideoType,
} from '../types';

export const isTextType = (ext: string): ext is TextType => {
  return textExt.filter((t) => ext === t).length !== 0;
};

export const isAudioType = (ext: string): ext is AudioType => {
  return audioExt.filter((t) => ext === t).length !== 0;
};

export const isImageType = (ext: string): ext is ImageType => {
  return imageExt.filter((t) => ext === t).length !== 0;
};

export const isVideoType = (ext: string): ext is VideoType => {
  return videoExt.filter((t) => ext === t).length !== 0;
};

export const isDirectoryType = (fileType: string): fileType is DirectoryType => {
  return fileType === 'directory';
};

export const getFilenameWithoutExtension = (filename: string) => {
  let result = filename.split('.');
  if (result.length === 1) return result.join();
  result.pop();
  return result.join('.');
};

export const getFileType = (filename: string): ContentType => {
  const extension = filename.split('.').pop();
  if (typeof extension === 'undefined') {
    return 'unknown' as UnknownType;
  }

  if (isTextType(extension) || isAudioType(extension) || isImageType(extension) || isVideoType(extension)) {
    return extension;
  }

  return 'unknown' as UnknownType;
};

export const getFileImage = (fileType: ContentType) => {
  if (isDirectoryType(fileType)) {
    return '/images/directory.png';
  } else if (isTextType(fileType)) {
    return '/images/text.png';
  } else if (isAudioType(fileType)) {
    return '/images/audio.png';
  } else if (isImageType(fileType)) {
    return '/images/unknown.png';
  } else if (isVideoType(fileType)) {
    return '/images/video.png';
  }
  return '/images/unknown.png';
};

export const getSourceURL = (media: string, group: string, filename: string) => {
  const patterns = new Map<string, string>([['#', '%23']]);
  filename = filename.replace(/#/g, (m) => {
    return patterns.get(m) ?? m;
  });
  const basepath = window.location.pathname.split('/').slice(4).join('/');
  return [MediaAddress, media, group, basepath, filename].join('/');
};
