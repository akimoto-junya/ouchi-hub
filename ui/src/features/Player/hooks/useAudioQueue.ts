import { useEffect } from 'react';
import { Media } from '../types';
import { applyToMediaSession } from '../services';
import useAudio from './useAudio';
import usePlayQueue from './usePlayQueue';

const useAudioQueue = () => {
  const [currentTime, duration, paused, ended, audioControl] = useAudio();
  const [queue, loopState, queueControl] = usePlayQueue();

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

  return [
    {
      nowPlaying: queue.current,
      currentTime: currentTime,
      duration: duration,
      paused: paused,
      ended: ended,
      loopState: loopState,
    },
    {
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
    },
  ] as const;
};

export default useAudioQueue;
