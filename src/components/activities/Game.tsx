import React from 'react';
import { twj } from '../../utils/tailwind-to-css';

export class GameActivity {
  largeImageDataUri: string;
  smallImageDataUri: string;
  name: string;
  details: string;
  state: string;
  elapsed: string;

  constructor(props: GameActivity) {
    this.largeImageDataUri = props.largeImageDataUri;
    this.smallImageDataUri = props.smallImageDataUri;
    this.name = props.name;
    this.details = props.details;
    this.state = props.state;
    this.elapsed = props.elapsed;
  }
}

export const Game = ({
  largeImageDataUri,
  smallImageDataUri,
  name,
  details,
  state,
  elapsed,
}: Required<GameActivity>) => (
  <div style={twj('flex flex-col gap-2')}>
    <p
      style={twj(
        'flex items-center gap-1 p-0 m-0 text-sm text-white/90 font-semibold uppercase',
      )}
    >
      Playing a game
    </p>

    <div style={twj('flex items-center')}>
      <div style={twj('relative')}>
        <img
          src={largeImageDataUri}
          alt="game"
          style={twj('w-[60px] h-[60px] rounded-md')}
        />
        <img
          src={smallImageDataUri}
          alt="game"
          style={twj(
            'w-[20px] h-[20px] absolute bottom-0 right-0 rounded-full border-[1px] border-solid border-white',
          )}
        />
      </div>

      <div style={twj('flex flex-col gap-1 ml-2')}>
        <p style={twj('text-sm text-white/90 m-0 p-0 font-semibold')}>{name}</p>
        <p style={twj('text-xs text-white/70 m-0 p-0')}>{details}</p>
        <p style={twj('text-xs text-white/70 m-0 p-0')}>{state}</p>
        <p style={twj('text-xs text-white/70 m-0 p-0')}>{elapsed} elapsed</p>
      </div>
    </div>
  </div>
);
