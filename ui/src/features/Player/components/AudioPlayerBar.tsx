import { FC, MouseEvent } from "react";
import { AudioPlayerProps, LoopState } from "../types";
import styles from '../styles/AudioPlayerBar.module.css';
import {formatTime} from 'utils/helper';

type PlayButtonImg = "/images/play.png" | "/images/stop.png";
type LoopButtonImg = "/images/no-loop.png" | "/images/loop.png" | "/images/onetrack-loop.png";

const playButton = (paused: boolean): PlayButtonImg  => {
  return paused? "/images/play.png" : "/images/stop.png";
};

const loopStateButton = (loopState: LoopState): LoopButtonImg => {
  switch (loopState) {
    case LoopState.NoLoop:
      return "/images/no-loop.png";
    case LoopState.All:
      return "/images/loop.png";
    case LoopState.OneTrack:
      return "/images/onetrack-loop.png";
  }
};

const AudioPlayerBar: FC<AudioPlayerProps> = ({audio, control}) => {
  const jumpTime = (event: MouseEvent<HTMLProgressElement>) => {
    const left = event.currentTarget.getBoundingClientRect().left
    const right = event.currentTarget.getBoundingClientRect().right;
    const width = (right - left) | 1;
    const ratio = (event.clientX - left) / width;
    control.jump(ratio * audio.duration);
  };

  return (
    <>
    <div className={styles.player}>
        <div className={styles["player-content"]}>
            <img className={styles["album-art"]} src={audio.nowPlaying.artworkUrl} alt="" />
            <div className={styles.info}>
                <div className={styles["info-wrapper"]}>
                    <div className={styles.name}>{audio.nowPlaying.title}</div>
                </div>
                <div className={styles["info-wrapper"]}>
                    <div className={styles.album}>{audio.nowPlaying.album}</div>
                </div>
            </div>
            <div className={styles["controls-wrapper"]}>
            <div className={styles.controls}>
                <div className={styles.empty}></div>
                <img src="/images/prev.png" alt="" className={styles["prev-button"]} onClick={control.prev} />
                <img src={playButton(audio.paused)} alt="" className={styles["play-button"]} onClick={control.toggle} />
                <img src="/images/next.png" alt="" className={styles["next-button"]} onClick={control.next} />
                <img src={loopStateButton(audio.loopState)} alt="" className={styles["repeat-button"]} onClick={control.toggleLoopState} />
            </div>
            <div className={styles["seek-bar-wrapper"]}>
                <div className={styles["current-time"]}>{formatTime(audio.currentTime | 0)}</div>
                <progress className={styles["seek-bar"]} value={audio.currentTime | 0} max={audio.duration | 1} onClick={jumpTime}> </progress>
                <div className={styles.duration}>{formatTime(audio.duration | 0)}</div>
            </div>
            </div>
        </div>
    </div>

    </>
  );
};

export default AudioPlayerBar;
