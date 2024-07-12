import React from 'react';

interface IProps {
  username: string;
  status: string;
  avatarDataUri: string;
  bannerDataUri?: string;
}

const App = ({ username, status, avatarDataUri, bannerDataUri }: IProps) => (
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
        className="absolute w-[400px] h-[500px] inset-0 bg-[#1a1c1f] font-['Century Gothic', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif] text-white text-[16px] flex flex-col rounded-[10px]"
      >
        <div className="h-[100px] relative">
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
            <img
              src={avatarDataUri}
              alt="avatar"
              className="w-[80px] h-[80px] rounded-full border-[2px] border-solid border-white"
            />
          </div>
        </div>
      </div>
    </foreignObject>
  </svg>
);

export default App;
