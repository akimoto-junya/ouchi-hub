import { useState, useEffect, ReactElement } from 'react';
import MobileAudioPlayer from './MobileAudioPlayer';
import AudioPlayerBar from './AudioPlayerBar';
import { useAudioQueue } from '../hooks';
import { Media } from '../types';
import Box from '@mui/material/Box';

const AudioPlayer = () => {
  const [audio, control] = useAudioQueue();

  useEffect(() => {
    control.setSources([
      {
        url: 'https://bgmer.net/wp-content/uploads/2021/05/071_BPM108.mp3',
        title: '071_BPM108',
        album: 'iikannji',
        group: 'test',
        artworkUrl: 'https://soco-st.com/wp-content/themes/socost/upload/12528_color.png',
      } as Media,
      {
        url: 'https://bgmer.net/wp-content/uploads/2022/03/233_BPM163.mp3',
        title: '空想キャンパス',
        album: 'iikannji',
        group: 'test',
        artworkUrl: 'https://soco-st.com/wp-content/themes/socost/upload/15185_color.svg',
      } as Media,
    ]);
  }, []);

  if (!control.needsVisualize()) {
    return <></>;
  }

  return (
    <>
      <Box sx={{display: { xs: 'none', sm: 'block' }}}>
        <AudioPlayerBar audio={audio} control={control} />
      </Box>
      <Box sx={{display: { xs: 'block', sm: 'none' }}}>
        <MobileAudioPlayer audio={audio} control={control}/>
      </Box>
    </>
  );
};

export default AudioPlayer;
