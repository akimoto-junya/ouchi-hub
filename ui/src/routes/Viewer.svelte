<script>
  import {onDestroy} from 'svelte';
  import {source, isViewer} from '~/stores.js';
  import Header from '~/components/Header.svelte';
  export let params = {};
  const fileType = {
    "mp4": "video", "jpeg": "image", "jpg": "image", "png": "image",
  };
  const needsVideoPlayer = fileType[params.source.split('.').pop()] == "video";
  const sourceURL = `http://${MEDIA_ADDRESS}/` + params.source;
  $source = "";
  $isViewer = true;

  onDestroy(() => $isViewer = false);

</script>

<Header />
<div class="container">
{#if needsVideoPlayer}
  <video class="player" height="100%" width="100%" src={sourceURL} controls autoplay />
{:else}
  <img class="image" src={sourceURL} />
{/if}
</div>
<style>
  .container {
    width: 100%;
    height: 100%;
    background: #000000;
  }
  .player {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    margin: auto;
  }
  .image {
    object-fit: contain;
    max-height: 100%;
    max-width: 100%;
  }
</style>
