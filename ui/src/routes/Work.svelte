<script>
  import { onMount } from 'svelte';
  import { pop, push, location } from 'svelte-spa-router';
  import { needsMiniPlayer, isMobile, sources, apiAddress, mediaAddress } from '~/stores';
  import Item from '~/components/Item.svelte';
  import Header from '~/components/Header.svelte';
  export let params = {};
  let name = '';
  let media = '';
  let group = '';
  let imageURL = '';
  let files = [];
  let dirs = [];

  let isLoaded = false;
  $: loadComponent(params.tree);

  const getSourceURL = (name) => {
    const patterns = {
      '#': '%23',
    };
    name = name.replace(/#/g, (m) => {
      return patterns[m];
    });

    return [$mediaAddress, media, group, $location.replace('/works/', ''), name].join('/');
  };

  const setSources = (file) => {
    return () => {
      let res = files.filter((f) => f['fileType'] === file['fileType']);
      res.forEach((r) => (r['end'] = false));
      res[res.length - 1]['end'] = true;
      let i = 0;
      while (i < res.length && res[0] !== file) {
        const first = res.shift();
        res = [...res, first];
      }
      res.forEach((r) => (r['source'] = getSourceURL(r['name'])));
      res.forEach((r) => (r['album'] = name));
      res.forEach((r) => (r['group'] = group));
      res.forEach((r) => (r['imageURL'] = imageURL));
      $sources = res;
    };
  };

  const needsViewer = (fileType) => {
    const needsViewerType = {
      image: true,
      video: true,
    };
    return needsViewerType[fileType] || false;
  };

  async function loadComponent() {
    isLoaded = false;
    let res = await fetch($apiAddress + "/works/" + params.tree, {
      mode: 'cors',
    });
    res = await res.json();
    name = res['title'];
    media = res['media'];
    group = res['group'];
    imageURL = res['imageURL'];
    res = res['tree'];

    const patterns = {
      '&amp;': '&',
      '&gt;': '>',
      '&lt;': '<',
      '&quot;': '"',
    };
    const getFileType = (name) => {
      const fileType = {
        txt: 'text',
        mp3: 'audio',
        m4a: 'audio',
        wav: 'audio',
        mp4: 'video',
        jpeg: 'image',
        jpg: 'image',
        png: 'image',
      };
      return fileType[name.split('.').pop()] || 'directory';
    };

    res.forEach((r) => {
      r['fileType'] = getFileType(r['name']);
      r['name'] = r['name'].replace(/&(lt|gt|amp|quot);/g, (m) => {
        return patterns[m];
      });
    });

    files = res.filter((r) => r['type'] == 'file');
    dirs = res.filter((r) => r['type'] == 'directory');

    const getFileImageURL = (name) => {
      return 'images/' + getFileType(name) + '.png';
    };

    files.forEach((file) => {
      file['imageURL'] = file['fileType'] === 'image' ? getSourceURL(file['name']) : getFileImageURL(file['name']);
    });
    files.sort((a, b) => {
      const pa = String(a['name']).replace(/(\d+)/g, (m) => m.padStart(15, '0'));
      const pb = String(b['name']).replace(/(\d+)/g, (m) => m.padStart(15, '0'));
      return pa > pb ? 1 : pa < pb ? -1 : 0;
    });

    dirs.forEach((dir) => (dir['imageURL'] = 'images/directory.png'));
    isLoaded = true;
  }
</script>

<div>
  <Header>
    <div class="prev-wrapper" on:click="{pop}">
      <div class="prev">＜&nbsp;&nbsp;戻る</div>
    </div>
  </Header>
  {#if isLoaded}
    <div class="container {$needsMiniPlayer ? 'with-mini-player' : ''}">
      <div class="{$isMobile ? 'group-mobile' : 'group'} work">
        <img src="{imageURL}" alt="" class="work-thumbnail" />
        <div class="work-detail">
          <div class="work-name">{name}</div>
          <div class="work-group">{group}</div>
        </div>
      </div>
      <ol class="{$isMobile ? 'group-mobile' : 'group'}">
        {#each dirs as directory}
          <Item {...directory} on:click="{() => push($location + '%2F' + directory['name'])}" />
        {/each}
        {#each files as file}
          {#if needsViewer(file['fileType'])}
            <Item
              {...file}
              on:click="{() =>
                push('/view/' + [media, group, $location.replace('/works/', ''), file['name']].join('%2F'))}"
            />
          {:else}
            <Item {...file} on:click="{setSources(file)}" />
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

  .work {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #aaaaaa;
  }

  .work-thumbnail {
    flex-shrink: 0;
    height: 30%;
    width: 30%;
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    margin: 10px;
  }

  .work-detail {
    display: flex;
    flex-direction: column;
    margin: 10px;
  }

  .work-name {
    display: -webkit-box;
    color: #ffffff;
    font-size: 14px;
    max-height: 60px;
    line-height: 20px;
    font-weight: bold;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    word-break: break-word;
    overflow-wrap: break-word;
    overflow: hidden;
    margin-top: 20px;
  }

  .work-group {
    font-size: 14px;
    margin-top: 30px;
  }

  .group {
    width: 850px;
    margin: 10px auto;
    padding-left: 0px;
    list-style-type: none;
    background: #181818;
  }

  .group-mobile {
    width: auto;
    margin: 10px 10px;
    padding-left: 0px;
    list-style-type: none;
    background: #181818;
  }
</style>
