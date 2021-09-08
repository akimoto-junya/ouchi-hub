<script>
  import {onMount} from 'svelte';
  import {pop, push, location} from "svelte-spa-router";
  export let params = {};
  let name = "Work";
  let files = [];
  let dirs = [];

  $: loadComponent(params.tree);

  async function loadComponent() {
    let res = await fetch("http://192.168.1.100:3000/api/v1/works/" + params.tree, {
        mode: "cors",
    });
    res = await res.json();

    res = res["tree"];
    files = res.filter(r => r["type"] == "file");
    dirs = res.filter(r => r["type"] == "directory");
  }
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>{params.tree}</p>
  <button on:click={pop}>prev</button>
  {#each dirs as directory}
    <div on:click={push($location+"%2F"+directory["name"])}>{directory["name"]}</div>
  {/each}
  {#each files as file}
    <div>{file["name"]}</div>
  {/each}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
</style>
