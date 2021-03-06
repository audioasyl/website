import { Channel } from 'radiokit-toolkit-playback';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { omit } from 'lodash';
import moment from 'moment';

import { recordFilesForTagItems } from '../../queries/recordItem';
import { recordFileToMap } from '../../parsers/recordFile';
import { play, getCurrentSet } from '../../utils';
import superFetch from '../../superFetch';
import VolumeBar from './VolumeBar';
import Icon from '../Icon';

import './Player.scss';
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      metaData: {},
      minimalized: true,
      canSwitchSongs: false,
    };
  }

  componentDidMount = () => {
    this.context.location.query.id && this.fetchData(this.context.location.query.id);
  }

  componentWillReceiveProps = (nextProps, nextContext) => {
    const { id } = this.context.location.query;
    const { id: idNext, play: playStatus } = nextContext.location.query;

    if (id !== idNext) {
      this.state.player && this.state.player.stop();
      this.fetchData(idNext);
    }

    this.state.player && setPlayerStatus(this.state.player, playStatus);
  }

  componentWillUnmount = () => {
    this.state.player && this.state.player.stop();
    localStorage.setItem('playerSize', this.state.minimalized);
  }

  onCloseClick = () => {
    localStorage.setItem('playerSize', this.state.minimalized);
    this.context.router.replace({
      pathname: this.context.location.pathname,
      query: omit(this.context.location.query, ['play', 'id', 'channel_id']),
    });
  }

  setTrackInfo = track => {
    track.getInfoAsync()
      .then(response => {
        this.setState({ metaData: response.getMetadata() });
      })
      .catch(err => console.log(err)); // eslint-disable-line
  }

  buildPlayer = () => {
    const { channelId, accessToken } = this.state;
    const { play: playStatus } = this.context.location.query;

    const player = this.state.player || new Channel.Player(channelId, accessToken);

    player.setVolume(defaultVolume());
    setPlayerStatus(player, playStatus);

    player.on('track-position', (track, position, duration) =>
      this.renderTrackPosition(track, position, duration));
    player.on('playlist-fetched', track => this.setTrackInfo(getCurrentSet(track)));

    this.setState({ player });
  }

  fetchData = id =>
    superFetch(
      recordFilesForTagItems([id]).offset(this.state.offset).limit(LIMIT),
      data => {
        this.setState({
          track: recordFileToMap(data),
          offset: this.state.offset + LIMIT,
          channelId: this.context.location.query.channel_id,
          accessToken: 'demo',
        });

        this.buildPlayer();
      });

  renderTrackPosition = (track, position, duration) => {
    this.setState({
      progress: (position / duration) * 100,
      position,
    });
  }

  render() {
    const { play: status, id, channel_id: channelID } = this.context.location.query;
    const duration = moment.duration(this.state.metaData.duration || 0);
    const position = moment.duration(this.state.position || 0);
    const playerClasses = classNames(
      'Player',
      { 'Player--min': this.state.minimalized }
    );

    if (id && status) {
      return (
        <div className={playerClasses}>
          <div className="Player-buttons">
            {/* <button
              className="Player-button minimalize"
              onClick={() => this.setState({ minimalized: !this.state.minimalized })}
            >
              <Icon icon="minus" />
            </button> */}
            <button
              className="Player-button close"
              onClick={this.onCloseClick}
            >
              <Icon icon="cross" />
            </button>
          </div>
          <div className="Player-cover">
            <img
              className="Player-cover-img"
              src=""
              alt=""
            />
            <div>{this.state.metaData.artist}</div>
          </div>
          <div className="Player-console">
            <div>{this.state.metaData.title}</div>
            <div className="Player-console-progress">
              <div className="Player-console-progress-time">
                {position.minutes()}:{position.seconds()}
              </div>
              <div className="Player-console-progress-bar">
                <div
                  className="Player-console-progress-bar--fill"
                  style={{ width: `${this.state.progress}%` }}
                />
              </div>
              <div className="Player-console-progress-time">
                {duration.minutes()}:{duration.seconds()}
              </div>
            </div>
            <div className="Player-console-buttons">
              {this.state.canSwitchSongs && <button className="Player-console-button prev">
                <Icon icon="prev" />
              </button>}
              <button
                className="Player-console-button play"
                onClick={e => play(e, id, channelID, this.context)}
              >
                <Icon icon={iconMap[status]} />
              </button>
              {this.state.canSwitchSongs && <button className="Player-console-button next">
                <Icon icon="next" />
              </button>}
              <VolumeBar player={this.state.player} />
            </div>
          </div>
          <div className="Player-cover" />
        </div>
      );
    }

    return null;
  }
}

const defaultVolume = () =>
  localStorage.getItem('playerVolume') || 0.5;

const setPlayerStatus = (player, status) => (
  status === 'play' ? !player.isStarted() && player.start() : player.isStarted() && player.stop()
);

const LIMIT = 3;
const iconMap = {
  pause: 'play-1',
  play: 'pause',
};

Player.contextTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
};

export default Player;
