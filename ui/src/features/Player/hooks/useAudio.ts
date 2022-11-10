import { useState, useEffect, useReducer } from 'react';

const useAudio = () => {
  const forceUpdate = useReducer(() => ({}), {})[1] as () => void;
  const [audio, _] = useState(new Audio());

  useEffect(() => {
    audio.addEventListener('play', forceUpdate);
    audio.addEventListener('pause', forceUpdate);
    audio.addEventListener('ended', forceUpdate);
    audio.addEventListener('timeupdate', forceUpdate);
    return () => {
      audio.removeEventListener('play', forceUpdate);
      audio.removeEventListener('pause', forceUpdate);
      audio.removeEventListener('ended', forceUpdate);
      audio.removeEventListener('timeupdate', forceUpdate);
    };
  }, []);

  const play = () => {
    audio.play();
  };

  const pause = () => {
    audio.pause();
  };

  const jump = (time: number) => {
    if (time < 0) time = 0;
    else if (time > audio.duration) time = audio.duration;
    if (isNaN(time)) return;
    audio.currentTime = time;
  };

  const setSource = (source: string | URL) => {
    audio.src = source.toString();
    audio.load();
    forceUpdate();
  };

  return [audio.currentTime, audio.duration, audio.paused, audio.ended, { play, pause, jump, setSource }] as const;
};

export default useAudio;
