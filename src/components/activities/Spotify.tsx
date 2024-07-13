import React from 'react';
import { FaSpotify } from 'react-icons/fa';
import { twj } from '../../utils/tailwind-to-css';

export class SpotifyActivity {
  albumDataUri: string;
  songName: string;
  artistName: string;
  elapsed: string;
  totalDuration: string;
  progress: number;

  constructor(props: SpotifyActivity) {
    this.albumDataUri = props.albumDataUri;
    this.songName = props.songName;
    this.artistName = props.artistName;
    this.elapsed = props.elapsed;
    this.totalDuration = props.totalDuration;
    this.progress = props.progress;
  }
}

export const Spotify = ({
  albumDataUri,
  songName,
  artistName,
  elapsed,
  totalDuration,
  progress,
}: Required<SpotifyActivity>) => (
  <div style={twj('flex flex-col gap-2')}>
    <p
      style={twj(
        'flex items-center gap-1 p-0 m-0 text-sm text-white/90 font-semibold',
      )}
    >
      Listening to Spotify
      <FaSpotify style={twj('text-green-500')} />
    </p>

    <div style={twj('flex')}>
      <img
        src={albumDataUri}
        alt="album"
        style={twj('w-[50px] h-[50px] rounded-md')}
      />

      <div style={twj('flex flex-col gap-1 ml-2')}>
        <p style={twj('text-sm text-white/90 m-0 p-0')}>{songName}</p>
        <p style={twj('text-xs text-white/70 m-0 p-0')}>{artistName}</p>
      </div>
    </div>

    <div style={twj('flex flex-col gap-2')}>
      <div style={twj('w-full relative h-[3px] bg-gray-300 rounded-lg')}>
        <div
          style={twj(
            `absolute top-0 left-0 h-full bg-blue-500 w-[${progress}%]`,
          )}
        ></div>
      </div>

      <div style={twj('flex justify-between')}>
        <p style={twj('m-0 p-0 text-xs text-white/70')}>{elapsed}</p>
        <p style={twj('m-0 p-0 text-xs text-white/70')}>{totalDuration}</p>
      </div>
    </div>
  </div>
);
