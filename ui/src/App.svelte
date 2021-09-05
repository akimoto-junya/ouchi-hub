<script>
  import Router from 'svelte-spa-router';
  import {routes} from '~/routes';
  import {isMobile} from '~/stores';
  import MediaViewer from '~/components/MediaViewer/MediaViewer.svelte';
  import Header from '~/components/Header.svelte';

  let screenWidth;

  $: isMobile.update(_ => {
    return screenWidth <= 850;
  });

</script>

<svelte:window bind:innerWidth={screenWidth} />

<div class="container">
  <Header />
  <MediaViewer>
    <Router {routes} />
  </MediaViewer>
  <!-- <audio controls src="./test.mp3" width="100%"></audio> -->
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }
</style>
