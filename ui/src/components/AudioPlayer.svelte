<script>
  import {slide} from 'svelte/transition';
  import {sources, isViewer, isMobile, needsMiniPlayer} from '~/stores.js';
  let needsRepeat = [...Array(3).keys()];

  let i = 0;
  $: state = needsRepeat[i % needsRepeat.length];
  $: stateName = state === 0? "NoRepeat": state === 1? "OneRepeat" : "Repeat";

  let audio;
  $: queue = $sources;
  $: source = queue[0] !== undefined? queue[0]["source"]: "";

  let needsNext = false;
  $: if (needsNext) {
    if (state === 1) {
      audio.play();
    } else if (state == 2 || !queue[0]["end"]){
      const first = queue.shift();
      queue = [...queue, first];
    }
  }

</script>

<slot></slot>
{#if !$isViewer && source !== ""}
  <audio style="display: none;" src={source} controls autoplay bind:this={audio} bind:ended={needsNext} />
  {#if !$needsMiniPlayer}
    <div class="{$isMobile? 'player-mobile' : 'player'}"
         transition:slide={{y:-452, duration:200}} >
      <div class="hidden-button" on:click={() => $needsMiniPlayer = true} >下</div>
      <img class="album-art" src="https://cdn.pixabay.com/photo/2021/08/29/08/49/petit-minou-lighthouse-6582717_960_720.jpg" alt="ここにがぞうがはいる"/>
      <div class="controls">
        <button on:click={() => i++}>{stateName}</button>
      </div>
    </div>
  {:else}
    <div class="mini-player" on:click={() => $needsMiniPlayer = false}
        transition:slide={{y:60, duration:200}}
        >
    </div>
  {/if}
{/if}

<style>
  .player {
    position: fixed;
    right: 12px;
    bottom: 0;
    height: 452px;
    width: 322px;
    background : blue;
    border-radius: 5px;
    overflow: hidden;

    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.33);
    z-index: 2000;
  }

  .album-art {
    object-fit: contain;
    height: 100%;
    width: 100%;
    margin: auto;
  }


  .hidden-button {
    position: relative;
    top: 0;
    left: 0;
    height: 30px;
    width: 30px;
    margin: 10px;
    cursor: pointer;
    background: orange;
  }

  .controls {
    position: absolute;
    height: 200px;
    width: 100%;
    bottom: 0;
    background: white;
  }

  .player-mobile {
    position: fixed;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background: blue;
    z-index: 2000;
  }

  .mini-player {
    position: fixed;
    bottom: 0;
    left: 0;
    background: blue;
    height: 60px;
    width: 100%;
  }

</style>

