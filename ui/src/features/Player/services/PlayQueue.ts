import { Media, LoopState } from '../types';

class PlayQueue {
  private _queue: Media[];
  private _current: number;

  private needsPrepare = () => this._queue.length == 0;

  private _empty: Media = {
    url: '',
    title: '',
    album: '',
    group: '',
    artworkUrl: '',
  };

  constructor(queue?: Media[], onset?: number) {
    this._queue = queue ?? [];
    this._current = onset ?? 0;
  }

  get current(): Media {
    if (this.needsPrepare()) {
      return { url: '', title: '', album: '', artworkUrl: '' } as Media;
    }
    return this._queue[this._current];
  }

  get list(): Media[] {
    return this._queue;
  }

  canNext(loopState: LoopState): boolean {
    const nindex = this._current + 1;
    const len = this._queue.length;
    if (loopState === LoopState.All || loopState === LoopState.OneTrack) {
      return true;
    }
    return loopState === LoopState.NoLoop && nindex < len;
  }

  next(loopState: LoopState): Media {
    if (this.needsPrepare()) return this._empty;
    const nindex = this._current + 1;
    const len = this._queue.length;
    const noLoopCond = loopState === LoopState.NoLoop && nindex < len;

    if (noLoopCond || loopState === LoopState.All) {
      this._current = nindex % len | 0;
    }
    return this._queue[this._current];
  }

  canPrev(loopState: LoopState): boolean {
    const pindex = this._current - 1;
    const len = this._queue.length;
    if (loopState === LoopState.All || loopState === LoopState.OneTrack) {
      return true;
    }
    return loopState === LoopState.NoLoop && pindex >= 0;
  }

  prev(loopState: LoopState) {
    if (this.needsPrepare()) return this._empty;
    const pindex = this._current - 1;
    const len = this._queue.length;
    const noLoopCond = loopState === LoopState.NoLoop && pindex >= 0;

    if (noLoopCond || loopState === LoopState.All) {
      this._current = (pindex + len) % len | 0;
    }
    return this._queue[this._current];
  }

  add(value: Media) {
    this._queue.push(value);
  }
}

export default PlayQueue;
