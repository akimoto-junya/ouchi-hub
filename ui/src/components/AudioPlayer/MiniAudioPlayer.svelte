<script>
  import { sources, albumArt } from '~/stores.js';

  export let name;
  export let album;
  export let playState;
  export let time;
  export let currentTime;
  export let duration;
  export let play;
  export let prev;
  export let next;
  export let repeatStateImg;
  export let nextRepeatState;

  let progress;
  const seekTime = (e) => {
    time = (duration * e.offsetX) / progress.clientWidth;
  };

  const format = (seconds) => {
    if (isNaN(seconds)) return '';
    const m = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${m}:${seconds.toString().padStart(2, '0')}`;
  };
</script>

<div class="player">
  <div class="player-content">
    <img class="album-art" src="{$albumArt}" alt="" />
    <div class="info">
      <div class="info-wrapper"><div class="name">{name}</div></div>
      <div class="info-wrapper"><div class="album">{album}</div></div>
    </div>
    <div class="controls-wrapper">
      <div class="controls">
        <div class="empty"></div>
        <img src="images/prev.png" alt="" class="prev-button" on:click="{prev}" />
        <img src="{playState}" alt="" class="play-button" on:click="{play}" />
        <img src="images/next.png" alt="" class="next-button" on:click="{next}" />
        <img src="{repeatStateImg}" alt="" class="repeat-button" on:click="{nextRepeatState}" />
      </div>
      <div class="seek-bar-wrapper">
        <div class="current-time">{format(time)}</div>
        <progress class="seek-bar" value="{currentTime}" on:click="{seekTime}" bind:this="{progress}"> </progress>
        <div class="duration">{format(duration)}</div>
      </div>
    </div>
  </div>
</div>

<style>
  .player {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #252525;
    color: #ffffff;
    height: 70px;
    width: 100%;
    z-index: 2000;
  }

  .player-content {
    position: absolute;
    display: flex;
    left: 0;
    width: calc(100% - 60px);
    justify-content: start;
    margin-right: 60px;
  }

  .album-art {
    object-fit: contain;
    height: 50px;
    width: 50px;
    max-height: 100%;
    max-width: 100%;
    margin: 10px 10px 20px 10px;
  }

  .info-wrapper {
    height: 20px;
    width: 200px;
    margin: 10px;
  }

  .name {
    width: 200px;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .album {
    width: 200px;
    color: #aaaaaa;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .controls-wrapper {
    display: flex;
    flex-direction: column;
    object-fit: contain;
    height: 200px;
    width: 100%;
    bottom: 0;
  }

  .seek-bar-wrapper {
    display: flex;
    width: 100%;
    margin: 5px 0;
  }

  .seek-bar {
    flex: 1;
    height: 5px;
    margin: auto 0;
    border-radius: 2px;
    color: orange;
    background-color: #cccccc;
    cursor: pointer;
  }

  .seek-bar::-webkit-progress-value {
    background-color: orange;
  }

  .seek-bar::-webkit-progress-var {
    background-color: #cccccc;
  }

  .seek-bar::-moz-progress-bar {
    background-color: orange;
  }

  .current-time {
    margin: 0 10px 0 10px;
    font-size: 11px;
  }

  .duration {
    margin: 0 10px 0 10px;
    font-size: 11px;
  }

  .controls {
    display: flex;
    justify-content: center;
    margin: 15px 0 10px 0;
  }

  .empty {
    width: 15px;
    height: 15px;
    margin: 0 10px;
  }

  .prev-button {
    width: 15px;
    height: 15px;
    margin: 0 10px;
    cursor: pointer;
  }

  .play-button {
    width: 15px;
    height: 15px;
    margin: 0 10px;
    cursor: pointer;
  }

  .next-button {
    width: 15px;
    height: 15px;
    margin: 0 10px;
    cursor: pointer;
  }

  .repeat-button {
    width: 15px;
    height: 15px;
    margin: 0 10px;
    cursor: pointer;
  }
</style>
