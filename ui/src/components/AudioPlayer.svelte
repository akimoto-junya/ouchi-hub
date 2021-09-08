<script>
  import {source, isViewer} from '~/stores.js';
</script>

<div class="container">
  <slot></slot>
  {#if $source !== "" && !$isViewer}
    <audio src={$source} controls autoplay />
  {/if}
</div>

<style>
  .container {
    flex: 1;
    flex-shrink: 0;
    overflow: auto;
  }
</style>

