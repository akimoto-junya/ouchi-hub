<script>
  import {push} from 'svelte-spa-router';
  export let name;
  export let type;
  export let fileType;
  export let imageURL;
</script>

<li on:click class="item">
  <img src={imageURL} alt="{type}" loading="lazy" class="item-type" />
  <div class="item-detail">
    <div class="name">{name}</div>
    <div class="supplement">
    </div>
  </div>
</li>

<style>
  .item {
    display: flex;
    position: relative;
    height: 70px;
    width: auto;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #eeeeee;
    list-style-type: none;
    overflow: hidden;
  }

  .item:last-of-type {
    border-bottom: none;
  }

  .item-type {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    margin: auto 10px;
    overflow: hidden;
    object-fit: contain;
  }

  .item-detail {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 10px;
  }

  .name {
    display: -webkit-box;
    flex-shrink: 0;
    flex-basis: 36px;
    margin: 0 10px;
    max-height: 36px;
    line-height: 18px;
    font-weight: bold;
    font-size: 14px;
    color: #000;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-word;
    overflow-wrap: break-word;
    overflow: hidden;
  }

  .supplement {
    display: flex;
    flex-shrink: 0;
    margin: 20px 10px 10px 10px;
    font-size: 14px;
    max-height: 18px;
  }
</style>
