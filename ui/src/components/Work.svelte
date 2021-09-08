<script>
  import {push} from 'svelte-spa-router';
  export let title;
  export let group;
  export let media;
  export let mediaTypeColor;
  export let imageURL;


</script>

<li class="work" on:click={push("/works/" + title)}>
  <img src={imageURL} alt="{title}" class="thumbnail" />
  <div class="work-detail">
    <div class="title">{title}</div>
    <div class="supplement" style="--media-type-color: {mediaTypeColor}">
      <div class="group">{group}</div>
      <div class="media-type">{media}</div>
    </div>
  </div>
</li>

<style>
  .work {
    display: flex;
    position: relative;
    height: 100px;
    width: auto;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #eeeeee;
    list-style-type: none;
    overflow: hidden;
  }

  .work:last-of-type {
    border-bottom: none;
  }

  .thumbnail {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    margin: 10px;
    border: 1px solid #eeeeee;
    overflow: hidden;
    object-fit: contain;
  }

  .work-detail {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 10px;
  }

  .title {
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

  .group {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 30vw;
  }

  .media-type {
    flex-shrink: 0;
    color: #fff;
    background: var(--media-type-color);
    font-weight: bold;
    vertical-align: middle;
    border-radius: 3px;
    padding: 0 3px;
    margin-left: auto;
  }
</style>
