<script>
  import {onMount} from 'svelte';
  import {pop, push, location} from "svelte-spa-router";
  import {isMobile, source} from '~/stores';
  import Item from '~/components/Item.svelte';
  export let params = {};
  let name = "Work";
  let files = [];
  let dirs = [];

  let isLoaded = false;
  $: loadComponent(params.tree);

  async function loadComponent() {
    isLoaded = false;
    let res = await fetch("http://192.168.1.100:3000/api/v1/works/" + params.tree, {
        mode: "cors",
    });
    res = await res.json();

    res = res["tree"];
    files = res.filter(r => r["type"] == "file");
    dirs = res.filter(r => r["type"] == "directory");
    isLoaded = true;
  }

  const setSource = (sourceName) => {
    return () => {
      $source = "192.168.1.100/media/"+ sourceName;
    };
  };
</script>

{#if isLoaded}
<div>
  <h1>Hello {name}!</h1>
  <p>{params.tree}</p>
  <button on:click={pop}>prev</button>
  <ol class="{$isMobile? 'group-mobile' : 'group'}">
  {#each dirs as directory}
    <Item {...directory} on:click={push($location+"%2F"+directory["name"])}/>
  {/each}
  {#each files as file}
    <Item {...file} on:click={setSource(file["name"])} />
  {/each}
  </ol>
</div>
{/if}

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
