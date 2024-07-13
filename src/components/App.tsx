import { PresenceStatus } from 'discord.js';
import React from 'react';
import { MdDoNotDisturbOn } from 'react-icons/md';
import { FaMoon } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { Spotify, SpotifyActivity } from './activities/Spotify';
import { TBioNode } from '../types';

interface IProps {
  username: string;
  globalName: string;
  pronouns: string;
  status: PresenceStatus;
  bio: TBioNode;
  avatarDataUri?: string;
  bannerDataUri?: string;
  avatarDecorationDataUri?: string;
  badgeDataUris: string[];
  currentActivity?: SpotifyActivity;
}

const DEFAULT_WIDTH = 310;
const DEFAULT_HEIGHT = 510;

const App = ({
  username,
  globalName,
  pronouns,
  status,
  bio,
  avatarDataUri,
  bannerDataUri,
  avatarDecorationDataUri,
  badgeDataUris,
  currentActivity,
}: IProps) => {
  const height = !currentActivity ? DEFAULT_HEIGHT - 140 : DEFAULT_HEIGHT;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // @ts-ignore
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      width={`${DEFAULT_WIDTH}px`}
      height={`${height}px`}
    >
      {/* <style dangerouslySetInnerHTML={{ __html: '.red{color:red}' }} /> */}
      <foreignObject
        x="0"
        y="0"
        width={`${DEFAULT_WIDTH}`}
        height={`${height}`}
      >
        <div
          // @ts-ignore
          xmlns="http://www.w3.org/1999/xhtml"
          className={`absolute w-[${DEFAULT_WIDTH - 10}px] h-[${
            height - 10
          }px] inset-0 bg-[#1a1c1f] font-default text-white text-[16px] flex flex-col rounded-[10px] gap-10`}
        >
          <div className="h-[100px] relative flex flex-col gap-10">
            {bannerDataUri ? (
              <img
                src={bannerDataUri}
                alt="banner"
                className="w-full h-full object-fill rounded-t-[10px]"
              />
            ) : (
              <div className="w-full h-full bg-gray-500 rounded-t-[10px]" />
            )}

            <div className="absolute top-[80%] left-[2%] bottom-0 rounded-t-[10px] flex items-center justify-center">
              <div className="relative w-[80px] h-[80px]">
                <img
                  src={avatarDataUri}
                  alt="avatar"
                  className={`rounded-full w-[76px] h-[76px] border-[2px] ${
                    !avatarDecorationDataUri ? 'border-solid border-white' : ''
                  }`}
                />
                {avatarDecorationDataUri && (
                  <img
                    src={avatarDecorationDataUri}
                    alt="avatar-decoration"
                    className="absolute inset-0 w-full h-full"
                  />
                )}
                <div className="absolute bottom-[2px] right-[10px]">
                  {status === 'dnd' ? (
                    <MdDoNotDisturbOn
                      width={10}
                      height={10}
                      className="text-red-500 bg-[#1a1c1f] p-[2px] rounded-full"
                    />
                  ) : status === 'online' ? (
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full" />
                  ) : status === 'idle' ? (
                    <FaMoon
                      width={10}
                      height={10}
                      className="text-yellow-500 bg-[#1a1c1f] p-[2px] rounded-full"
                    />
                  ) : (
                    <div className="w-[10px] h-[10px] bg-gray-500 rounded-full" />
                  )}
                </div>
              </div>
            </div>

            <div className="absolute top-[105%] right-[2%] bottom-0">
              <div className="flex flex-row gap-2 bg-[#121315] rounded-md p-1">
                {badgeDataUris.map((badge) => (
                  <img
                    key={badge}
                    src={badge}
                    alt="badge"
                    className="w-[20px] h-[20px] rounded-md"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col mx-2 gap-5">
            <div className="flex flex-col gap-1 rounded-md p-2 bg-[#121315]">
              <p className="text-xl font-bold m-0 p-0">{globalName}</p>
              <div className="flex items-center gap-1">
                <p className="text-sm m-0 p-0">{username}</p>
                <GoDotFill className="text-xs" />
                <p className="text-sm text-white/80 m-0 p-0">{pronouns}</p>
              </div>
            </div>

            <div className="flex flex-col rounded-md p-2 gap-2 bg-[#121315]">
              <p className="p-0 m-0 text-sm text-white/90 font-semibold">
                About Me
              </p>

              {bio.map((line, index) => (
                <div key={index} className="flex flex-row">
                  {line.map((node, index) =>
                    node.type === 'char' ? (
                      <p key={index} className="m-0 p-0">
                        {node.value}
                      </p>
                    ) : (
                      <img
                        key={index}
                        src={node.value}
                        alt="emoji"
                        className="w-[20px] h-[20px]"
                      />
                    ),
                  )}
                </div>
              ))}
            </div>

            {currentActivity ? (
              <div className="rounded-md p-2 bg-[#121315]">
                {currentActivity instanceof SpotifyActivity ? (
                  <Spotify {...currentActivity} />
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
