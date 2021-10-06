<script>
  import { onMount, afterUpdate } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { isMobile, libraryScrollY, needsMiniPlayer, albumArt } from '~/stores';
  import Header from '~/components/Header.svelte';
  import Work from '~/components/Work.svelte';

  let works = [];

  onMount(async () => {
    let res = await fetch(`http://${API_ADDRESS}/api/v1/works`, {
      mode: 'cors',
    });
    res = await res.json();
    res = res['works'];
    res.sort((a, b) => (a['title'] < b['title'] ? -1 : 1));
    res.sort((a, b) => (a['group'] < b['group'] ? -1 : 1));
    res.sort((a, b) => (a['media'] < b['media'] ? -1 : 1));
    res.forEach((r) => (r['afterImageURL'] = r['imageURL']));
    works = res;
  });

  const submit = (work) => {
    return () => {
      fetch(`http://${API_ADDRESS}/api/v1/works/` + work.title + '/image', {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify({
          URL: work.afterImageURL,
        }),
      }).then((_) => {
        location.reload();
      });
    };
  };
</script>

<div>
  <Header>
    <div class="display"><div>作品画像の設定</div></div>
  </Header>
  <div class="container {$needsMiniPlayer ? 'with-mini-player' : ''}">
    <ol class="{$isMobile ? 'group-mobile' : 'group'}">
      {#each works as work}
        <div class="work-wrapper">
          <div class="work">
            <img src="{work.imageURL}" alt="" class="thumbnail" />
            <div>{work.title}</div>
          </div>
          <form class="form-wrapper" on:submit|preventDefault="{submit(work)}">
            <label class="label" for="{work.title}">URL :</label>
            <input
              class="form"
              type="url"
              name="{work.title}"
              placeholder="画像のURLを入力(ex: http://example.com/image.png)"
              bind:value="{work.afterImageURL}"
            />
            <button type="submit" class="submit-button">変更</button>
          </form>
        </div>
      {/each}
    </ol>
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

  .work-wrapper {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-bottom: 1px solid #eeeeee;
    list-style-type: none;
    overflow: hidden;
  }

  .work {
    display: flex;
    position: relative;
    align-items: center;
    height: 100px;
    width: auto;
  }

  .thumbnail {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    margin: 10px;
    overflow: hidden;
    object-fit: contain;
  }

  .label {
    margin: 0 10px;
  }
  .form-wrapper {
    display: flex;
    align-items: center;
    margin: 10px;
  }

  .form {
    flex-grow: 1;
    height: 100%;
    width: auto;
    margin: auto;
  }

  .submit-button {
    margin: 0 10px;
  }
</style>
