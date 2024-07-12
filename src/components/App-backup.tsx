import React from 'react';

interface IProps {
  username: string;
  status: string;
  avatarDataUri: string;
}

const App = ({ username, status, avatarDataUri }: IProps) => (
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
        className="absolute w-[400px] h-[500px] inset-0 bg-[#1a1c1f] font-['Century Gothic', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif] text-white text-[16px] flex flex-col p-[5px] rounded-[10px]"
      >
        <div
          style={{
            width: '400px',
            height: '100px',
            inset: 0,
            display: 'flex',
            flexDirection: 'row',
            paddingBottom: '5px',
            borderBottom: 'solid 0.5px hsl(0, 0%, 100%, 10%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: '80px',
              width: '80px',
            }}
          >
            <img
              src={avatarDataUri}
              style={{
                border: 'solid 3px #FAA61A',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                position: 'relative',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>
          <div
            style={{
              height: '80px',
              width: '260px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                height: '25px',
              }}
            >
              <h1
                className="text-red-500"
                // style={xw`text-[1.15rem] m-0 mr-3 whitespace-nowrap`}
                // style={{
                //   fontSize: '1.15rem',
                //   margin: '0 12px 0 0',
                //   whiteSpace: 'nowrap',
                // }}
              >
                {username}
              </h1>

              <img
                src="data:image/png;base64,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"
                style={{
                  width: 'auto',
                  height: '20px',
                  position: 'relative',
                  top: '50%',
                  transform: 'translate(0%, -50%)',
                  marginRight: '7px',
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '150px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontStyle: 'italic',
              fontSize: '0.8rem',
              color: '#aaa',
              height: 'auto',
              textAlign: 'center',
            }}
          >
            {status}
          </p>
        </div>
      </div>
    </foreignObject>
  </svg>
);

export default App;
