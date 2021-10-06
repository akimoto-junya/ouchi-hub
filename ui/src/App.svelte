<script>
  import Router from 'svelte-spa-router';
  import { routes } from '~/routes';
  import { isMobile } from '~/stores';
  import AudioPlayer from '~/components/AudioPlayer/AudioPlayer.svelte';

  let screenWidth;

  $: isMobile.update((_) => {
    return screenWidth <= 850;
  });
</script>

<svelte:window bind:innerWidth="{screenWidth}" />

<div class="container">
  <AudioPlayer>
    <Router routes="{routes}" />
  </AudioPlayer>
</div>

<style>
  .container {
    height: 100%;
    overflow: hidden;
  }
</style>
