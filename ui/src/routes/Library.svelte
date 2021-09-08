<script>
  import {onMount} from 'svelte'
  import {isMobile, isListView} from '~/stores';
  import Work from '~/components/Work.svelte';

  let works = [];

  const mediaTypeColor = {
    "Image": "#14c369",
    "Music": "#ff9c1e",
    "ASMR": "#ff9c1e",
    "Video": "#ef489b",
  };

  const getMediaTypeColor = (t) => {
    return mediaTypeColor[t] || "#9e9e9e";
  };

  onMount(async () => {
    const res = await fetch("http://192.168.1.100:3000/api/v1/works", {
      mode: "cors",
    });
    works = await res.json();
    works = works["works"]
    works.map(work => work["mediaTypeColor"] = getMediaTypeColor(work["media"]));
  })

</script>

<div>
  <ol class="{$isMobile? 'group-mobile' : 'group'}">
  {#each works as work}
    <Work {...work} />
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
