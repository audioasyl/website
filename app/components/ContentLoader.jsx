import React from 'react';
import spiner from '../../public/images/spiner.svg';

const ContentLoader = () => {
  const serverStyles = process.env.BROWSER
    ? {
      height: 'auto',
    }
    : {
      background: '#ededed',
      position: 'fixed',
      height: '100vh',
      zIndex: 9999,
      bottom: 0,
      right: 0,
      left: 0,
      top: 0,
    };
    // FIXME!!! never ends loading in dev
  return (<div />);

  // return (
  //   <div
  //     className="ContentLoader"
  //     style={{
  //       display: 'flex',
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //       ...serverStyles,
  //     }}
  //   >
  //     <img className="ContentLoader-spinner" src={spiner} alt="spiner" />
  //   </div>
  // );
};

export default ContentLoader;
