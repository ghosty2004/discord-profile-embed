import { PresenceStatus } from 'discord.js';
import React from 'react';
import { MdDoNotDisturbOn } from 'react-icons/md';
import { FaMoon } from 'react-icons/fa';

interface IProps {
  username: string;
  status: PresenceStatus;
  avatarDataUri?: string;
  bannerDataUri?: string;
  avatarDecorationDataUri?: string;
  badgeDataUris: string[];
}

const App = ({
  username,
  status,
  avatarDataUri,
  bannerDataUri,
  avatarDecorationDataUri,
  badgeDataUris,
}: IProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // @ts-ignore
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    width="410px"
    height="510px"
  >
    {/* <style dangerouslySetInnerHTML={{ __html: '.red{color:red}' }} /> */}
    <foreignObject x="0" y="0" width="410" height="510">
      <div
        // @ts-ignore
        xmlns="http://www.w3.org/1999/xhtml"
        className="absolute w-[400px] h-[500px] inset-0 bg-[#1a1c1f] font-default text-white text-[16px] flex flex-col rounded-[10px]"
      >
        <div className="h-[100px] relative flex flex-col gap-10 pl-3">
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

          <div className="flex">
            <div className="flex flex-col gap-1">
              <p className="font-bold m-0 p-0">DISPLAY NAME</p>
              <p className="text-[10px] m-0 p-0">USERNAME</p>
              <p className="text-white/80 text-[10px] m-0 p-0">PRONOUNS</p>
            </div>
          </div>
        </div>
      </div>
    </foreignObject>
  </svg>
);

export default App;
