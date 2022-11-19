/* File */
export const textExt = ['text', 'txt'] as const;
export const audioExt = ['mp3', 'wav'] as const;
export const imageExt = ['jpeg', 'jpg', 'png'] as const;
export const videoExt = ['mp4'] as const;

export type TextType = typeof textExt[number];
export type AudioType = typeof audioExt[number];
export type ImageType = typeof imageExt[number];
export type VideoType = typeof videoExt[number];
export type DirectoryType = 'directory';
export type UnknownType = 'unknown';

export type ContentType = TextType | AudioType | ImageType | VideoType | DirectoryType | UnknownType;

export type FileInfo = {
  name: string;
  fileType: ContentType;
};

export type Tree = {
  name: string;
  type: string;
  contents: Tree[] | undefined;
};

/* Work */
export type WorkInfo = {
  title: string;
  group: string;
  media: string;
  imageURL: string;
  tree: Tree[];
};

export type WorkInfoList = {
  works: WorkInfo[];
};
