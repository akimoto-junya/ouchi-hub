<script>
  import {fade} from 'svelte/transition';
  let showDrawer;
  let isDisabled;

  const openDrawer = () => {
    showDrawer = true;
    isDisabled = false;
  };
  const closeDrawer = () => {
    showDrawer = false;
    isDisabled = false;
  };
</script>

<div class="menu" on:click={openDrawer}></div>
<div class="drawer {isDisabled? 'is-disabled' : showDrawer? 'is-opened' : 'is-closed'}">
  <div class="close" on:click={closeDrawer}>x</div>
</div>
{#if showDrawer}
<div class="overlay" transition:fade="{{duration:200}}"></div>
{/if}

<style>
  .drawer {
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
