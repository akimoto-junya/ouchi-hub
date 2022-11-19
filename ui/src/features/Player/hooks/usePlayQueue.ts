import { useState } from 'react';
import { Media, LoopState } from '../types';
import { PlayQueue } from '../services';

const usePlayQueue = () => {
  const [queue, setQueue] = useState<PlayQueue>(new PlayQueue());
  const [loopState, setLoopState] = useState<LoopState>(LoopState.All);

  const next = () => {
    const current = queue.next(loopState);
    setQueue(queue);
    return current;
  };

  const prev = () => {
    const current = queue.prev(loopState);
    setQueue(queue);
    return current;
  };

  const reset = () => {
    setQueue(new PlayQueue());
  };

  const setSources = (sources: Media[], onset?: number) => {
    const q = new PlayQueue(sources, onset);
    setQueue(q);
    return q.current;
  };

  const addSource = (source: Media) => {
    queue.add(source);
    setQueue(queue);
  };

  const toggleLoopState = () => {
    const stateNum = Object.keys(LoopState).length;
    setLoopState(((loopState + 1) % stateNum) as LoopState);
  };

  return [queue, loopState, { next, prev, reset, setSources, addSource, toggleLoopState }] as const;
};

export default usePlayQueue;
