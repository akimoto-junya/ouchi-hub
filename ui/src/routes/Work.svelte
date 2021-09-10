<script>
  import {onMount} from 'svelte';
  import {pop, push, location} from "svelte-spa-router";
  import {needsMiniPlayer, isMobile, sources} from '~/stores';
  import Item from '~/components/Item.svelte';
  import Header from '~/components/Header.svelte';
  export let params = {};
  let name = "";
  let media = "";
  let group = "";
  let files = [];
  let dirs = [];

  let isLoaded = false;
  $: loadComponent(params.tree);

  const getSourceURL = (name) => {
    const patterns = {
      "#": "%23",
    };
    name = name.replace(/#/g, m => {
      return patterns[m];
    });

    return [`http://${MEDIA_ADDRESS}`, media, group, $location.replace('/works/', ''), name].join('/');
  };

  const setSources = (file) => {
    return () => {
      let res = files.filter(f => f["fileType"] === file["fileType"]);
      res.forEach(r => r["end"] = false);
      res[res.length - 1]["end"] = true;
      let i = 0;
      while (i < res.length && res[0] !== file) {
        const first = res.shift();
        res = [...res, first];
      }
      res.map(r => r["source"] = getSourceURL(r["name"]));
      $sources = res;
    };
  };

  const needsViewer = (fileType) => {
    const needsViewerType = {
      "image": true, "video": true,
    };
    return needsViewerType[fileType] || false;
  };

  async function loadComponent() {
    isLoaded = false;
    let res = await fetch(`http://${API_ADDRESS}/api/v1/works/` + params.tree, {
        mode: "cors",
    });
    res = await res.json();
    name = res["title"];
    media = res["media"];
    group = res["group"];
    res = res["tree"];


    const patterns = {
      "&amp;":"&", "&gt;": ">", "&lt;": "<", "&quot;": '"',
    };
    const getFileType = (name) => {
      const fileType = {
        "txt": "text", "mp3": "audio", "m4a": "audio", "wav": "audio",
        "mp4": "video", "jpeg": "image", "jpg": "image", "png": "image",
      };
      return fileType[name.split('.').pop()] || "directory";
    };

    res.forEach(r => {
      r["fileType"] = getFileType(r["name"]);
      r["name"] = r["name"].replace(/&(lt|gt|amp|quot);/g, m => {
            return patterns[m];
      });
    });

    files = res.filter(r => r["type"] == "file");
    dirs = res.filter(r => r["type"] == "directory");


    const getFileImageURL = (name) => {
      return "images/" + getFileType(name) + ".png";
    };

    files.forEach(file => {
      file["imageURL"] = (file["fileType"] === "image")? getSourceURL(file["name"]) : getFileImageURL(file["name"]);
    });
    dirs.forEach(dir => dir["imageURL"] = "images/directory.png");
    isLoaded = true;
  }

</script>

<div>
<Header>
  <div class="prev-wrapper" on:click={pop}>
    <div class="prev">＜&nbsp;&nbsp;戻る</div>
  </div>
</Header>
  {#if isLoaded}
  <div class="container {$needsMiniPlayer? 'with-mini-player' : ''}">
    <h1>{name}</h1>
    <p>{params.tree}</p>
    <ol class="{$isMobile? 'group-mobile' : 'group'}">
    {#each dirs as directory}
      <Item {...directory} on:click={push($location+"%2F"+directory["name"])}/>
    {/each}
    {#each files as file}
      {#if needsViewer(file["fileType"])}
        <Item {...file} on:click={push("/view/" + [media, group, $location.replace('/works/', ''), file["name"]].join('%2F'))} />
      {:else}
        <Item {...file} on:click={setSources(file)} />
      {/if}
    {/each}
    </ol>
  </div>
  {/if}
</div>

<style>
  .container {
    position: absolute;
    width: 100%;
    top: 40px;
    bottom: 0;
    overflow-y: scroll;
  }

  .prev-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    cursor: pointer;
  }

  .prev {
    color: #ffffff;
    font-weight: bold;
    font-size: 18px;
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
