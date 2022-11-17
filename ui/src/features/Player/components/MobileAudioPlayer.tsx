import { MouseEvent, createRef, FC, useState } from 'react';
import styles from '../styles/MobileAudioPlayer.module.css';
import {AudioPlayerProps, LoopState} from '../types';
import {formatTime} from 'utils/helper';
import Slide from '@mui/material/Slide';

type PlayButtonImg = "/images/play.png" | "/images/stop.png";
type LoopButtonImg = "/images/no-loop.png" | "/images/loop.png" | "/images/onetrack-loop.png";

type Props = AudioPlayerProps & {
  needsMiniPlayer: boolean;
  togglePlayerAppearance: () => void;
};

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

const SimplePlayer: FC<Props> = ({audio, control, needsMiniPlayer, togglePlayerAppearance}) => {
  return (
    <Slide direction="up" in={needsMiniPlayer} mountOnEnter unmountOnExit>
      <div className={styles["mini-player"]}>
          <div className={styles["mini-player-content"]} onClick={togglePlayerAppearance}>
              <img className={styles["album-art-mini"]} src={audio.nowPlaying.artworkUrl} alt="" />
              <div className={styles["name-mini-wrapper"]}>
                  <div className={styles["name-mini"]}>{audio.nowPlaying.title}</div>
              </div>
          </div>
          <img src={playButton(audio.paused)} alt="" className={styles["play-button-mini"]}
              onClick={control.toggle}
          />
          <progress className={styles["seek-bar-mini"]} value={audio.currentTime} max={audio.duration | 1}></progress>
      </div>
    </Slide>
  );
};

const Player: FC<Props> = ({audio, control,needsMiniPlayer, togglePlayerAppearance}) => {
  const jumpTime = (event: MouseEvent<HTMLProgressElement>) => {
    const left = event.currentTarget.getBoundingClientRect().left
    const right = event.currentTarget.getBoundingClientRect().right;
    const width = (right - left) | 1;
    const ratio = (event.clientX - left) / width;
    control.jump(ratio * audio.duration);
  };

  return (
    <Slide direction='up' in={!needsMiniPlayer} mountOnEnter unmountOnExit>
      <div className={styles.player}>
        <img src="images/down-arrow.png" alt="" className={styles["hidden-button"]} onClick={togglePlayerAppearance} />
        <img className={styles["album-art"]} src={audio.nowPlaying.artworkUrl} alt="" />
        <div className={styles["controls-wrapper"]}>
          <div className={styles["seek-bar-wrapper"]}>
            <div className={styles["current-time"]}>{formatTime(audio.currentTime | 0)}</div>
            <progress className={styles["seek-bar"]} value={audio.currentTime} max={audio.duration | 1} onClick={jumpTime} > </progress>
            <div className={styles.duration}>{formatTime(audio.duration | 0)}</div>
          </div>
          <div className={styles["name-wrapper"]}><div className={styles.name}>{audio.nowPlaying.title}</div></div>
          <div className={styles.controls}>
            <div className={styles.empty}></div>
            <img src="/images/prev.png" alt="" className={styles["prev-button"]} onClick={control.prev} />
            <img src={playButton(audio.paused)} alt="" className={styles["play-button"]} onClick={control.toggle} />
            <img src="/images/next.png" alt="" className={styles["next-button"]} onClick={control.next} />
            <img src={loopStateButton(audio.loopState)} alt="" className={styles["repeat-button"]} onClick={control.toggleLoopState} />
          </div>
        </div>
      </div>
    </Slide>
  );
};

const MobileAudioPlayer: FC<AudioPlayerProps> = ({audio, control}) => {
  const [needsMiniPlayer, setMimiPlayer] = useState(false);
  const togglePlayerAppearance = () => {
    if (needsMiniPlayer) {
      setMimiPlayer(false);
      return;
    }
    setMimiPlayer(true);
  };

  return (
    <>
      {needsMiniPlayer
      ? <SimplePlayer
          audio={audio} control={control}
          togglePlayerAppearance={togglePlayerAppearance}
          needsMiniPlayer={needsMiniPlayer}
        />
      : <Player audio={audio} control={control}
          togglePlayerAppearance={togglePlayerAppearance}
          needsMiniPlayer={needsMiniPlayer}
        />
      }
    </>
  );
};

export default MobileAudioPlayer;
