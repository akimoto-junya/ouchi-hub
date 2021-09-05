<script>
  import {pop} from "svelte-spa-router";
  export let params = {};
  let name = "Work";
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>{params.id}</p>
  <button on:click={pop}>prev</button>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
</style>
