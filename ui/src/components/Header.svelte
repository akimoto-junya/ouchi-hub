<script>
  import Drawer from './Drawer.svelte';

  let displayName = "";
  let showDrawer = false;

</script>

<div class="container">
  <div class="display-name">{displayName}</div>
  <div class="layout"></div>
</div>
<Drawer/>

<style>
  .container {
    display: flex;
    height: 40px;
    background: rgb(255, 0, 0);
  }

  .menu {
    width: 40px;
    height: 40px;
    background-image: url("https://iconbox.fun/wp/wp-content/uploads/bars_24.png");
    background-size: contain;
    cursor: pointer;
  }

  .display-name {

  }

  .layout {
    width: 40px;
    margin-left: auto;
    background-color: rgb(0, 0, 255);
    cursor: pointer;
  }
</style>
