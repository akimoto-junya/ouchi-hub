import { useEffect, createContext, ReactNode, FC, useReducer } from 'react';
import { AudioQueue, LoopState, Media } from '../types';
import { applyToMediaSession } from '../services';
import useAudio from '../hooks/useAudio';
import usePlayQueue from '../hooks/usePlayQueue';


export const AudioPlayerContext = createContext<AudioQueue | undefined>(undefined);

type Props = {
  children: ReactNode;
}

export const AudioPlayerProvider: FC<Props> = ({ children }) => {
  const [currentTime, duration, paused, ended, audioControl] = useAudio();
  const [queue, loopState, queueControl] = usePlayQueue();
  const forceUpdate = useReducer(() => ({}), {})[1] as () => void;

  const next = () => {
    const current = queueControl.next();
    audioControl.setSource(current.url);
    audioControl.play();
  };

  const prev = () => {
    const current = queueControl.prev();
    audioControl.setSource(current.url);
    audioControl.play();
  };

  const reset = () => {
    queueControl.reset();
    audioControl.setSource('');
  };

  const { setMetaData, play, pause } = applyToMediaSession(audioControl.play, audioControl.pause, next, prev);

  const setSources = (sources: Media[], onset?: number) => {
    const current = queueControl.setSources(sources, onset);
    audioControl.setSource(current.url);
    setMetaData(current);
    forceUpdate();
  };

  const toggle = () => {
    if (paused) play();
    else pause();
  };

  useEffect(() => {
    if (ended && queue.canNext(loopState)) {
      next();
    }
  }, [ended]);

  const audio = {
    nowPlaying: queue.current,
    currentTime: currentTime,
    duration: duration,
    paused: paused,
    ended: ended,
    loopState: loopState,
  };

  const control = {
    setSources: setSources,
    play: play,
    pause: pause,
    toggle: toggle,
    jump: audioControl.jump,
    next: next,
    prev: prev,
    reset: reset,
    toggleLoopState: queueControl.toggleLoopState,
    needsVisualize: () => queue.list.length !== 0,
  };

  return (
    <AudioPlayerContext.Provider value={{audio: audio, control: control}}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayerProvider;
