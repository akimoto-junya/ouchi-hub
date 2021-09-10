<script>
  import {onMount, onDestroy} from 'svelte';
  import {slide} from 'svelte/transition';
  import Drawer from './Drawer.svelte';
  import {isPaused, showDrawer, isViewer} from '~/stores.js';

  let displayName = "";

  let onHeader = false;
  let disabledHeader = false;

  let timer = [];
  $: if ($isViewer && !disabledHeader && !onHeader && !$isPaused && !$showDrawer) {
    timer.push(setTimeout(() => {
      if ($isViewer && !disabledHeader) {
        disabledHeader = true;
      }
    }, 2000));
  }
  $: if (!$isViewer || $isPaused || $showDrawer || onHeader) {
    timer.forEach(t => clearTimeout(t));
    timer = [];
    disabledHeader = false;
  }

</script>

<svelte:body
  on:mousemove={(e) => {
    if ($isViewer && e.pageY < 40) {
      onHeader = true;
    } else {
      onHeader = false;
    }
  }}
/>

{#if !disabledHeader}
<div class="container" out:slide="{{y:-40, duration: $isViewer && disabledHeader? 500 : 0}}">
  <div class="menu" on:click={() => {$showDrawer = true}} ></div>
  <slot></slot>
  <div class="layout"></div>
</div>
{/if}
<Drawer/>

<style>
  .container {
    display: flex;
    position: fixed;
    z-index: 500;
    width: 100%;
    height: 40px;
    overflow: hidden;
    background: orange;
  }

  .menu {
    width: 40px;
    height: 40px;
    background-image: url("https://iconbox.fun/wp/wp-content/uploads/bars_24.png");
    background-size: contain;
    cursor: pointer;
  }

  .layout {
    width: 40px;
    margin-left: auto;
    background-color: rgb(0, 0, 255);
    cursor: pointer;
  }
</style>
