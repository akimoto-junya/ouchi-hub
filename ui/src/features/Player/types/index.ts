export const LoopState = {
  NoLoop: 0,
  All: 1,
  OneTrack: 2,
} as const;

export type LoopState = typeof LoopState[keyof typeof LoopState];

export type Media = {
  url: string;
  title: string;
  album: string;
  group: string;
  artworkUrl: string;
};

export type AppliedMediaSessionMethod = {
  setMetaData: (media: Media) => void;
  play: () => void;
  pause: () => void;
};

export type AudioQueue = {
  audio: {
    nowPlaying: Media;
    currentTime: number;
    duration: number;
    paused: boolean;
    ended: boolean;
    loopState: LoopState;
  };
  control: {
    setSources: (sources: Media[], onset?: number) => void;
    play: () => void;
    pause: () => void;
    toggle: () => void;
    jump: (time: number) => void;
    next: () => void;
    prev: () => void;
    reset: () => void;
    toggleLoopState: () => void;
    needsVisualize: () => boolean;
  };
};

export type AudioPlayerProps = {
  audio: {
    nowPlaying: Media;
    currentTime: number;
    duration: number;
    paused: boolean;
    ended: boolean;
    loopState: LoopState;
  };
  control: {
    setSources: (sources: Media[], onset?: number) => void;
    play: () => void;
    pause: () => void;
    toggle: () => void;
    jump: (time: number) => void;
    next: () => void;
    prev: () => void;
    reset: () => void;
    toggleLoopState: () => void;
    needsVisualize: () => boolean;
  };
};
