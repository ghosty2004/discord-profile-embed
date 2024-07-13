import React from 'react';
import { FaSpotify } from 'react-icons/fa';

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
  <div className="flex flex-col gap-2">
    <p className="flex items-center gap-1 p-0 m-0 text-sm text-white/90 font-semibold">
      Listening to Spotify
      <FaSpotify className="text-green-500" />
    </p>

    <div className="flex">
      <img
        src={albumDataUri}
        alt="album"
        className="w-[50px] h-[50px] rounded-md"
      />

      <div className="flex flex-col gap-1 ml-2">
        <p className="text-sm text-white/90 m-0 p-0">{songName}</p>
        <p className="text-xs text-white/70 m-0 p-0">{artistName}</p>
      </div>
    </div>

    <div className="flex flex-col gap-2">
      <div className="w-full relative h-[3px] bg-gray-300 rounded-lg">
        <div
          className={`absolute top-0 left-0 h-full bg-blue-500 w-[${progress}%]`}
        ></div>
      </div>

      <div className="flex justify-between">
        <p className="m-0 p-0 text-xs text-white/70">{elapsed}</p>
        <p className="m-0 p-0 text-xs text-white/70">{totalDuration}</p>
      </div>
    </div>
  </div>
);
