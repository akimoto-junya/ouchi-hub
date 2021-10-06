<script>
  import { slide } from 'svelte/transition';
  import { sources, needsMiniPlayer, albumArt } from '~/stores.js';

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

{#if !$needsMiniPlayer}
  <div class="player" transition:slide="{{ y: -452, duration: 200 }}">
    <img src="images/down-arrow.png" alt="" class="hidden-button" on:click="{() => ($needsMiniPlayer = true)}" />
    <img class="album-art" src="{$albumArt}" alt="" />
    <div class="controls-wrapper">
      <div class="seek-bar-wrapper">
        <div class="current-time">{format(time)}</div>
        <progress class="seek-bar" value="{currentTime}" on:click="{seekTime}" bind:this="{progress}"> </progress>
        <div class="duration">{format(duration)}</div>
      </div>
      <div class="name-wrapper"><div class="name">{name}</div></div>
      <div class="controls">
        <div class="empty"></div>
        <img src="images/prev.png" alt="" class="prev-button" on:click="{prev}" />
        <img src="{playState}" alt="" class="play-button" on:click="{play}" />
        <img src="images/next.png" alt="" class="next-button" on:click="{next}" />
        <img src="{repeatStateImg}" alt="" class="repeat-button" on:click="{nextRepeatState}" />
      </div>
    </div>
  </div>
{:else}
  <div class="mini-player" transition:slide="{{ y: 60, duration: 200 }}">
    <div class="mini-player-content" on:click="{() => ($needsMiniPlayer = false)}">
      <img class="album-art-mini" src="{$albumArt}" alt="" />
      <div class="name-mini-wrapper"><div class="name-mini">{name}</div></div>
    </div>
    <img src="{playState}" alt="" class="play-button-mini" on:click="{play}" />
    <progress class="seek-bar-mini" value="{currentTime}"></progress>
  </div>
{/if}

<style>
  .player {
    position: fixed;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background: #393939;
    z-index: 2000;
  }

  .album-art {
    object-fit: contain;
    height: calc(100% - 200px);
    width: 100%;
    max-height: calc(100% - 200px);
    max-width: 100%;
    margin: auto;
  }

  .hidden-button {
    position: absolute;
    top: 0;
    left: 0;
    height: 40px;
    width: 40px;
    margin: 10px;
    cursor: pointer;
    z-index: 2050;
  }

  .controls-wrapper {
    display: flex;
    flex-direction: column;
    object-fit: contain;
    height: 200px;
    width: 100%;
    bottom: 0;
    background: white;
  }

  .name-wrapper {
    height: 20px;
    margin: 10px;
  }

  .name {
    text-align: center;
    width: 100%;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .seek-bar-wrapper {
    display: flex;
    width: 100%;
    margin: 20px 0;
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
    justify-content: space-between;
    margin: 20px;
  }

  .empty {
    width: 30px;
    height: 30px;
  }

  .prev-button {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .play-button {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .next-button {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .repeat-button {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .mini-player {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #ffffff;
    height: 70px;
    width: 100%;
    cursor: pointer;
    z-index: 2000;
  }

  .mini-player-content {
    position: absolute;
    display: flex;
    left: 0;
    width: calc(100% - 60px);
    justify-content: start;
    margin-right: 60px;
  }

  .album-art-mini {
    object-fit: contain;
    height: 50px;
    width: 50px;
    max-height: 100%;
    max-width: 100%;
    margin: 10px 10px 20px 10px;
  }

  .name-mini-wrapper {
    height: 20px;
    width: calc(100% - 100px);
    margin: 20px 20px 0 20px;
  }

  .name-mini {
    width: 100%;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .play-button-mini {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 30px;
    top: 20px;
    cursor: pointer;
    z-index: 2050;
  }

  .seek-bar-mini {
    position: absolute;
    bottom: 0;
    height: 3px;
    width: 100%;
    background-color: #ffffff;
  }

  .seek-bar-mini::-webkit-progress-value {
    background-color: orange;
  }

  .seek-bar-mini::-webkit-progress-bar {
    background-color: #ffffff;
  }

  .seek-bar-mini::-moz-progress-bar {
    background-color: orange;
  }
</style>
