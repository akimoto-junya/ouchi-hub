import { LoopState } from './index';
import Media from './Media';
import PlayingQueue from './PlayingQueue';

class MediaPlayer {
  private _playingQueue: PlayingQueue;
  private _loopState: LoopState;

  private _isPaused: boolean = true;
  private _currentTime: number = 0;
  private _duration: number = 0;

  constructor(queue: Media[], onset?: number, loopState?: LoopState) {
    this._playingQueue = new PlayingQueue(queue, onset ?? 0);
    this._loopState = loopState ?? LoopState.All;
  }

  get title(): string {
    return '';
  }

  get currentTime(): number {
    return this._currentTime;
  }

  get duration(): number {
    return this._duration;
  }

  get isPaused(): boolean {
    return this._isPaused;
  }

  get progress(): number {
    return (this._currentTime / this._duration) | 0;
  }

  get nowPlaying(): Media {
    return this._playingQueue.current;
  }

  play() {
    this._isPaused = false;
  }

  pause() {
    this._isPaused = true;
  }

  toggle() {
    this._isPaused = !this._isPaused;
  }

  next() {
    this._currentTime = 0;
    this._playingQueue.next(this._loopState);
  }

  prev() {
    this._currentTime = 0;
    this._playingQueue.prev(this._loopState);
  }
}

export default MediaPlayer;
