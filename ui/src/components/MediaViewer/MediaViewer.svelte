<script>
  import {source} from '~/stores.js';
</script>

<div>
  <audio src={$source} controls autoplay />
  <slot></slot>
</div>

<style>

</style>

