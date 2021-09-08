<script>
  import Router from 'svelte-spa-router';
  import {routes} from '~/routes';
  import {isMobile} from '~/stores';
  import AudioPlayer from '~/components/AudioPlayer.svelte';

  let screenWidth;

  $: isMobile.update(_ => {
    return screenWidth <= 850;
  });

</script>

<svelte:window bind:innerWidth={screenWidth} />

<div class="container">
  <AudioPlayer>
    <Router {routes} />
  </AudioPlayer>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 100%;
  }
</style>
