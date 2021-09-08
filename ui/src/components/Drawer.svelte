<script>
  import {fade} from 'svelte/transition';
  import {showDrawer} from '~/stores.js';
  let isDisabled;

  const openDrawer = () => {
    isDisabled = false;
  };
  const closeDrawer = () => {
    isDisabled = false;
    $showDrawer = false;
  };
</script>

{#if $showDrawer}
<div class="drawer {isDisabled? 'is-disabled' : showDrawer? 'is-opened' : 'is-closed'}">
  <div class="close" on:click={closeDrawer}>x</div>
</div>
<div class="overlay" transition:fade="{{duration:200}}"></div>
{/if}

<style>
  .drawer {
    top: 0;
    position: fixed;
    width: 250px;
    height: 100%;
    background-color: rgb(255, 255, 0);
    z-index: 2;
  }

  @keyframes close-drawer {
    from {
      transform: translateX(0px);
    }
    to {
      transform: translateX(-251px);
    }
  }

  .is-disabled {
    display: none;
  }

  .is-closed {
    display: flex;
    animation: 200ms linear close-drawer 1 forwards;
    background-color: rgb(255, 0, 255);
  }

  .is-opened {
    display: flex;
  }

  .close {
    width: 40px;
    height: 40px;
    background-color: rgb(255, 0, 255);
    cursor: pointer;
  }

  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(50, 50, 50, 0.5);
    z-index: 1;
  }
</style>
