<script>
  import { slide } from 'svelte/transition';
  import { sources, isPaused, isViewer, isMobile, needsMiniPlayer, albumArt } from '~/stores.js';
  import MiniAudioPlayer from './MiniAudioPlayer.svelte';
  import MobileAudioPlayer from './MobileAudioPlayer.svelte';

  let audio;

  /* 再生する曲 */
  let source;
  let name;
  let album
  let group;
  sources.subscribe(s => {
    if (s.length === 0) {
      return;
    }
    source = s[0]['source'];
    name = s[0]['name'];
    album = s[0]['album'];
    group = s[0]['group'];
    $albumArt = s[0]['imageURL'];
  });

  /* 再生時間 */
  let time = 0;
  let duration;
  $: currentTime = time / duration || 0;

  /* リピート */
  let repeatState = 2;
  const nextRepeatState = () => {
    repeatState = (repeatState + 1) % 3;
  };
  $: repeatStateImg =
    repeatState === 0 ? 'images/no-repeat.png' : repeatState === 1 ? 'images/one-repeat.png' : 'images/repeat.png';

  /* 次の曲に行く動作 */
  let needsNext = false;
  $: if (needsNext) {
    time = 0;
    if (repeatState === 1) {
      audio.play();
    } else if (repeatState === 2 || !$sources[0]['end']) {
      const first = $sources.shift();
      $sources = [...$sources, first];
    }
  }

  /* 操作 */
  $: playState = $isPaused ? 'images/play.png' : 'images/stop.png';
  const prev = () => {
    time = 0;
    if (repeatState === 1) {
      return;
    }
    if (repeatState === 2 || !$sources[$sources.length - 1]['end']) {
      const last = $sources.pop();
      $sources = [last, ...$sources];
    }
  };

  const next = () => {
    time = 0;
    if (repeatState === 1) {
      return;
    }
    if (repeatState === 2 || !$sources[0]['end']) {
      const first = $sources.shift();
      $sources = [...$sources, first];
    }
  };

  const play = () => {
    if (audio.paused) {
      audio.play();
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
      }
    } else {
      audio.pause();
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
    }
  };

  /* Madia Session API */
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', play);
    navigator.mediaSession.setActionHandler('pause', play);
    navigator.mediaSession.setActionHandler('previoustrack', prev);
    navigator.mediaSession.setActionHandler('nexttrack', next);
  }

  albumArt.subscribe(artwork => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: name,
        album: album,
        artist: group,
        artwork: [{ src: artwork, type: "image/jpg", sizes: "256x256" }],
      });
    }
  });
</script>

<slot />
{#if !$isViewer && source}
  <audio
    style="display: none;"
    src="{source}"
    autoplay
    bind:currentTime="{time}"
    bind:duration
    bind:this="{audio}"
    bind:paused="{$isPaused}"
    bind:ended="{needsNext}"></audio>
  {#if $isMobile}
    <MobileAudioPlayer
      name="{name}"
      album="{album}"
      playState="{playState}"
      bind:time
      currentTime="{currentTime}"
      duration="{duration}"
      play="{play}"
      prev="{prev}"
      next="{next}"
      repeatStateImg="{repeatStateImg}"
      nextRepeatState="{nextRepeatState}"
    />
  {:else}
    <MiniAudioPlayer
      name="{name}"
      album="{album}"
      playState="{playState}"
      bind:time
      currentTime="{currentTime}"
      duration="{duration}"
      play="{play}"
      prev="{prev}"
      next="{next}"
      repeatStateImg="{repeatStateImg}"
      nextRepeatState="{nextRepeatState}"
    />
  {/if}
{/if}
