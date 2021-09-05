<script>
  import {isMobile, isListView} from '~/stores';
  import Work from '~/components/Work.svelte';
  let items = [
    {title: "item", maker: "maker", mediaType: "Audio", image: "", path: "123"},
    {title: "item", maker: "maker", mediaType: "Video", image: "", path: "456"},
    {title: "item", maker: "maker", mediaType: "Image", image: "", path: "789"},
    {title: "item", maker: "maker", mediaType: "Other", image: "", path: "1011"},
  ];

  const mediaTypeColor = {
    "Image": "#14c369",
    "Audio": "#ff9c1e",
    "Video": "#ef489b",
  };

  const getMediaTypeColor = (t) => {
    return mediaTypeColor[t] || "#9e9e9e";
  };

  items.map(item => item["mediaTypeColor"] = getMediaTypeColor(item.mediaType));
</script>

<div>
  <ol class="{$isMobile? 'group-mobile' : 'group'}">
  {#each items as item}
    <Work {...item} />
  {/each}
  <ol>
</div>

<style>
  .group {
    width: 850px;
    margin: 10px auto;
    padding-left: 0px;
    list-style-type: none;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
  }
  .group-mobile {
    width: auto;
    margin: 10px 10px;
    padding-left: 0px;
    list-style-type: none;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
  }
</style>
