import { useState, useEffect, useContext } from 'react';
import { AudioPlayerContext } from './AudioPlayerProvider';
import MobileAudioPlayer from './MobileAudioPlayer';
import AudioPlayerBar from './AudioPlayerBar';
import Box from '@mui/material/Box';

const AudioPlayer = () => {
  const audioPlayer = useContext(AudioPlayerContext);

  if (typeof audioPlayer === 'undefined' || !audioPlayer.control.needsVisualize()) {
    return <></>;
  }

  const {audio, control} = audioPlayer;

  return (
    <>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <AudioPlayerBar audio={audio} control={control} />
      </Box>
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <MobileAudioPlayer audio={audio} control={control} />
      </Box>
    </>
  );
};

export default AudioPlayer;
