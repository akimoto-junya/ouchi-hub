<script>
  import {onDestroy} from 'svelte';
  import {pop} from 'svelte-spa-router';
  import {isPaused, sources, isViewer} from '~/stores.js';
  import Header from '~/components/Header.svelte';
  export let params = {};
  const fileType = {
    "mp4": "video", "jpeg": "image", "jpg": "image", "png": "image",
  };
  const needsVideoPlayer = fileType[params.source.split('.').pop()] == "video";
  const sourceURL = `http://${MEDIA_ADDRESS}/` + params.source;
  $isViewer = true;
  if (!needsVideoPlayer) {
    $isPaused = false;
  }
  onDestroy(() => $isViewer = false);
</script>

<Header>
  <div class="prev-wrapper" on:click={() => pop()}>
    <div class="prev">＜&nbsp;&nbsp;戻る</div>
  </div>
</Header>
<div class="container">
{#if needsVideoPlayer}
  <!-- svelte-ignore a11y-media-has-caption -->
  <video class="player" height="100%" width="100%"
        src={sourceURL} controls autoplay
        bind:paused={$isPaused}
  />
{:else}
  <img class="image" src={sourceURL} alt="" />
{/if}
</div>
<style>
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000000;
  }

  .prev-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    cursor: pointer;
  }

  .prev {
    color: #ffffff;
    font-weight: bold;
    font-size: 18px;
  }

  .player {
    height: 100%;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    margin: auto;
  }

  .image {
    height: 100%;
    width: 100%;
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    margin: auto;
  }
</style>
