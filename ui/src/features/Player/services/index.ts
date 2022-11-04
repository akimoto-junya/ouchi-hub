export * from './MediaPlayer';

export const LoopState = {
  NoLoop: 0,
  All: 1,
  OneTrack: 2,
} as const;

export type LoopState = typeof LoopState[keyof typeof LoopState];
