<script>
  import {onMount} from 'svelte'
  import {push} from 'svelte-spa-router';
  import {isMobile, isListView, needsMiniPlayer, albumArt} from '~/stores';
  import Header from '~/components/Header.svelte';
  import Work from '~/components/Work.svelte';

  let works = [];

  const color = [
    "#14c369", "#ff9c1e", "#1c75bc", "#ef489b",
    "#665990", "#9e9e9e"
  ];

  const mediaTypeColor = {};
  let i = 0;
  const getMediaTypeColor = (t) => {
    if (t in mediaTypeColor === false) {
      mediaTypeColor[t] = color[i % color.length];
      i++;
    }
    return mediaTypeColor[t];
  };

  onMount(async () => {
    const res = await fetch(`http://${API_ADDRESS}/api/v1/works`, {
      mode: "cors",
    });
    works = await res.json();
    works = works["works"]
    works.forEach(work => work["mediaTypeColor"] = getMediaTypeColor(work["media"]));
    works.sort((a, b) => a["title"] < b["title"]? -1 : 1);
    works.sort((a, b) => a["group"] < b["group"]? -1 : 1);
    works.sort((a, b) => a["media"] < b["media"]? -1 : 1);
  })

</script>

<div>
  <Header>
    <div class="display"><div>ライブラリ</div></div>
  </Header>
  <div class="container {$needsMiniPlayer? 'with-mini-player' : ''}">
    <ol class="{$isMobile? 'group-mobile' : 'group'}">
    {#each works as work}
      <Work {...work}  on:click={() => {
          $albumArt = work.imageURL;
          push("/works/" + work.title);
        }}
      />
    {/each}
    <ol>
  </div>
</div>

<style>
  .container {
    position: absolute;
    width: 100%;
    top: 40px;
    bottom: 0;
    overflow-y: scroll;
  }

  .display {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-left: 10px;
    font-weight: bold;
    color: #ffffff;
  }

  .with-mini-player {
    bottom: 60px;
  }

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
