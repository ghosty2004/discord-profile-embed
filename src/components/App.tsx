import { PresenceStatus } from 'discord.js';
import React from 'react';
import { MdDoNotDisturbOn } from 'react-icons/md';
import { FaMoon } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { twj } from '../utils/tailwind-to-css';
import { Spotify, SpotifyActivity } from './activities/Spotify';
import { Game, GameActivity } from './activities/Game';
import { TBioNode } from '../types';

interface IProps {
  username: string;
  globalName: string;
  pronouns: string;
  status: PresenceStatus;
  bio: TBioNode;
  bannerColor?: any;
  avatarDataUri?: string;
  bannerDataUri?: string;
  avatarDecorationDataUri?: string;
  profileEffectDataUri?: string;
  badgeDataUris: string[];
  currentActivity?: SpotifyActivity | GameActivity;
}

const DEFAULT_WIDTH = 350;
const DEFAULT_HEIGHT = 310;

const App = ({
  username,
  globalName,
  pronouns,
  status,
  bio,
  bannerColor,
  avatarDataUri,
  bannerDataUri,
  avatarDecorationDataUri,
  profileEffectDataUri,
  badgeDataUris,
  currentActivity,
}: IProps) => {
  const haveBio = bio.filter((f) => f.length > 0).length > 0;
  const haveActivity = !!currentActivity;

  let height = DEFAULT_HEIGHT;

  if (haveBio) {
    height += 100;
  }

  if (haveActivity) {
    height += 100;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // @ts-ignore
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      width={`${DEFAULT_WIDTH}px`}
      height={`${height}px`}
    >
      <foreignObject
        x="0"
        y="0"
        width={`${DEFAULT_WIDTH}`}
        height={`${height}`}
      >
        <div
          // @ts-ignore
          xmlns="http://www.w3.org/1999/xhtml"
          style={twj(
            `absolute w-[${DEFAULT_WIDTH}px] h-[${height}px] inset-0 bg-[#1a1c1f] font-default text-white text-[16px] flex flex-col rounded-[10px] gap-10`,
          )}
        >
          <div style={twj('h-[100px] w-full relative flex flex-col gap-10')}>
            {bannerDataUri ? (
              <img
                src={bannerDataUri}
                alt="banner"
                style={twj('w-full h-full object-fill rounded-t-[10px]')}
              />
            ) : (
              <div
                style={twj(
                  `w-full h-full bg-[${
                    bannerColor || 'gray-500'
                  }] rounded-t-[10px]`,
                )}
              />
            )}

            {profileEffectDataUri && (
              <img
                src={profileEffectDataUri}
                alt="profile-effect"
                height={DEFAULT_HEIGHT}
                style={twj('absolute w-full object-fill rounded-[10px]')}
              />
            )}

            <div
              style={twj(
                'absolute top-[80%] left-[2%] bottom-0 rounded-t-[10px] flex items-center justify-center',
              )}
            >
              <div style={twj('relative w-[80px] h-[80px]')}>
                <img
                  src={avatarDataUri}
                  alt="avatar"
                  style={twj(
                    `rounded-full w-[76px] h-[76px] border-[4px] ${
                      !avatarDecorationDataUri
                        ? 'border-solid border-[#121315]'
                        : ''
                    }`,
                  )}
                />
                {avatarDecorationDataUri && (
                  <img
                    src={avatarDecorationDataUri}
                    alt="avatar-decoration"
                    style={twj('absolute inset-0 w-full h-full')}
                  />
                )}
                <div
                  style={twj('absolute bottom-0 right-[2px] flex items-end')}
                >
                  {status === 'dnd' ? (
                    <MdDoNotDisturbOn
                      style={twj(
                        'w-[14px] h-[14px] text-red-500 bg-[#121315] border-solid border-[#121315] border-[2px] mt-[3px] rounded-full',
                      )}
                    />
                  ) : status === 'online' ? (
                    <div
                      style={twj(
                        'w-[10px] h-[10px] bg-green-500 border-solid border-[#121315] border-[3px] rounded-full',
                      )}
                    />
                  ) : status === 'idle' ? (
                    <FaMoon
                      style={twj(
                        'w-[14px] h-[14px] text-yellow-500 bg-[#121315] border-solid border-[#121315] border-[2px] mt-[3px] rounded-full',
                      )}
                    />
                  ) : (
                    <div
                      style={twj(
                        'relative w-[10px] h-[10px] bg-gray-500 border-solid border-[#121315] border-[3px] rounded-full',
                      )}
                    >
                      <div
                        style={{
                          ...twj(
                            'absolute bg-[#121315] p-[2.5px] rounded-full',
                          ),
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div style={twj('absolute top-[105%] right-[2%] bottom-0')}>
              <div
                style={twj('flex flex-row gap-2 bg-[#121315] rounded-md p-1')}
              >
                {badgeDataUris.map((badge) => (
                  <img
                    key={badge}
                    src={badge}
                    alt="badge"
                    style={twj('w-[20px] h-[20px] rounded-md')}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={twj('flex flex-col mx-2 gap-5')}>
            <div style={twj('flex flex-col gap-1 rounded-md p-2 bg-[#121315]')}>
              <p style={twj('text-xl font-bold m-0 p-0')}>
                {globalName || username}
              </p>
              <div style={twj('flex items-center gap-1')}>
                <p style={twj('text-sm m-0 p-0')}>{username}</p>
                {pronouns && (
                  <>
                    <GoDotFill style={twj('text-xs')} />
                    <p style={twj('text-sm text-white/80 m-0 p-0')}>
                      {pronouns}
                    </p>
                  </>
                )}
              </div>
            </div>

            {haveBio && (
              <div
                style={twj('flex flex-col rounded-md p-2 gap-2 bg-[#121315]')}
              >
                <p style={twj('p-0 m-0 text-sm text-white/90 font-semibold')}>
                  About Me
                </p>

                {bio.map((line, index) => (
                  <div key={index} style={twj('flex flex-row')}>
                    {line.map((node, index) =>
                      node.type === 'char' ? (
                        <p key={index} style={twj('m-0 p-0')}>
                          {node.value}
                        </p>
                      ) : (
                        <img
                          key={index}
                          src={node.value}
                          alt="emoji"
                          style={twj('w-[20px] h-[20px]')}
                        />
                      ),
                    )}
                  </div>
                ))}
              </div>
            )}

            {haveActivity ? (
              <div style={twj('rounded-md p-2 bg-[#121315]')}>
                {currentActivity instanceof SpotifyActivity ? (
                  <Spotify {...currentActivity} />
                ) : currentActivity instanceof GameActivity ? (
                  <Game {...currentActivity} />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </foreignObject>
    </svg>
  );
};

export default App;
