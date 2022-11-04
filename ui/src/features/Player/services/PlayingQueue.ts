import Media from './Media';
import { LoopState } from './index';

class PlayingQueue {
  private _queue: Media[];
  private _current: number;

  constructor(queue: Media[], onset: number) {
    this._queue = queue;
    this._current = onset;
  }

  get current(): Media {
    return this._queue[this._current];
  }

  next(loopState: LoopState) {
    const nindex = this._current + 1;
    const len = this._queue.length;
    const noLoopCond = loopState === LoopState.NoLoop && nindex < len;

    if (noLoopCond || loopState === LoopState.All) {
      this._current = nindex % len | 0;
    }
  }

  prev(loopState: LoopState) {
    const pindex = this._current - 1;
    const len = this._queue.length;
    const noLoopCond = loopState === LoopState.NoLoop && pindex >= 0;

    if (noLoopCond || loopState === LoopState.All) {
      this._current = (pindex + len) % len | 0;
    }
  }

  add(value: Media) {
    this._queue.push(value);
  }
}

export default PlayingQueue;
