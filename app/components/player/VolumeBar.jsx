import React, { PropTypes } from 'react';
import Icon from '../Icon';

import './VolumeBar.scss';
class VolumeBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount = () => {
    this.props.player && localStorage.setItem('playerVolume', this.props.player.getVolume());
  }

  setWheelVolume = e => {
    e.nativeEvent.stopPropagation();
    e.preventDefault();

    if (this.props.player) {
      let volume = this.props.player.getVolume();
      const delta = e.nativeEvent.wheelDelta;
      volume += delta / 1000;
      (volume > 1) && (volume = 1);
      (volume < 0) && (volume = 0);

      this.setState({ volume });
      this.props.player.setVolume(volume);
    }
  }

  setClickVolume = e => {
    e.stopPropagation();
    e.preventDefault();

    const width = e.nativeEvent.srcElement.offsetWidth;
    const offset = e.nativeEvent.offsetX;

    if (this.props.player) {
      this.setState({ volume: offset / width });
      this.props.player.setVolume(offset / width);
    }
  }

  mute = e => {
    e.preventDefault();
    e.stopPropagation();

    if (this.props.player) {
      const player = this.props.player;
      const lastVolume = player.getVolume();
      lastVolume ? player.setVolume(0) : player.setVolume(this.state.lastVolume || 0.5);
      this.setState({ lastVolume, volume: player.getVolume() });
    }
  }

  render() {
    const volume = this.state.volume || getVolume(this.props.player);
    return (
      <div className="VolumeBar" onWheel={this.setWheelVolume}>
        <Icon icon="volume-medium" onClick={this.mute} />
        <div className="VolumeBar-bar-wrapper" onClick={this.setClickVolume}>
          <div className="VolumeBar-bar">
            <div
              className="VolumeBar-bar--fill"
              style={{
                width: `${volume * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const getVolume = player => (player ? player.getVolume() : 0);

VolumeBar.propTypes = {
  player: PropTypes.object,
};

VolumeBar.defaultProps = {
  player: null,
};

export default VolumeBar;
