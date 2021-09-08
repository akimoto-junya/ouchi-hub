<script>
  import {onMount, onDestroy} from 'svelte';
  import Drawer from './Drawer.svelte';
  import {showDrawer, isViewer, disabledHeader} from '~/stores.js';

  let displayName = "";

  $: if ($isViewer) {
    setTimeout(() => $disabledHeader = true, 2000);
  }
  onDestroy(() => $disabledHeader = false);

</script>

<div class="container {$disabledHeader? 'hidden': ''}">
  <div class="menu" on:click={() => {$showDrawer = true;}} ></div>
  <div class="display-name">{displayName}</div>
  <div class="layout"></div>
</div>
<Drawer/>

<style>
  .container {
    flex-shrink: 0;
    height: 40px;
    background: rgb(255, 0, 0);
  }
  .hidden {
    display: none;
  }

  .menu {
    width: 40px;
    height: 40px;
    background-image: url("https://iconbox.fun/wp/wp-content/uploads/bars_24.png");
    background-size: contain;
    cursor: pointer;
  }

  .display-name {

  }

  .layout {
    width: 40px;
    margin-left: auto;
    background-color: rgb(0, 0, 255);
    cursor: pointer;
  }
</style>
