<script>
  import {source} from '~/stores.js';
</script>

<div>
  {#if $source !== ""}
    <video src={$source} controls autoplay />
  {/if}
  <slot></slot>
</div>

<style>

</style>

