import { Media, LoopState, AppliedMediaSessionMethod } from '../types';

const applyToMediaSession = (
  unappliedPlay: () => void,
  unappliedPause: () => void,
  next: () => void,
  prev: () => void,
) => {
  if (!('mediaSession' in navigator)) {
    return {
      setMetaData: (media: Media) => {},
      play: unappliedPlay,
      pause: unappliedPause,
    } as AppliedMediaSessionMethod;
  }

  const setMetaData = (media: Media) => {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: media.title,
      album: media.album,
      artist: media.group,
      artwork: [{ src: media.artworkUrl }],
    });
  };

  const play = () => {
    unappliedPlay();
    navigator.mediaSession.playbackState = 'playing';
  };

  const pause = () => {
    unappliedPause();
    navigator.mediaSession.playbackState = 'paused';
  };

  navigator.mediaSession.setActionHandler('play', play);
  navigator.mediaSession.setActionHandler('pause', pause);
  navigator.mediaSession.setActionHandler('nexttrack', next);
  navigator.mediaSession.setActionHandler('previoustrack', prev);

  return { setMetaData, play, pause } as AppliedMediaSessionMethod;
};

export default applyToMediaSession;
