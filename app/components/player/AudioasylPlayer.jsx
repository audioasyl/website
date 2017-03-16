import React, { PropTypes } from 'react';
import Player from './Player';

class AudioasylPlayer extends React.Component {
  getChildContext = () => ({
    router: this.props.router,
    location: this.props.location,
  });

  render() {
    return (
      <div className="AudioasylPlayer">
        {this.props.children}
        <Player />
      </div>
    );
  }
}

AudioasylPlayer.propTypes = {
  children: PropTypes.object.isRequired,
};

AudioasylPlayer.propTypes = {
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

AudioasylPlayer.childContextTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
};


export default AudioasylPlayer;
