import moment from 'moment';
import React, { PropTypes } from 'react';
import { Channel } from 'radiokit-toolkit-playback';

import { recordFilesForTagItems } from '../../queries/recordItem';
import { recordFileToMap } from '../../parsers/recordFile';
import { play } from '../../utils';
import Icon from '../Icon';

import './Player.scss';
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      metaData: {},
    };
  }

  componentWillMount = () => {
    this.context.location.query.id && this.fetchData(this.context.location.query.id);
  }

  componentWillReceiveProps = (nextProps, nextContext) => {
    const { id } = this.context.location.query;
    const { id: idNext, play: playStatus } = nextContext.location.query;

    if (id !== idNext) { this.fetchData(idNext); }

    this.state.player && setPlayerStatus(this.state.player, playStatus);
  }

  componentWillUnmount = () => {
    localStorage.setItem('playerVolume', this.state.player.getVolume());
  }

  setVolume = (lvl = 1) => {
    console.log(lvl);
    const vol = this.state.player.getVolume();
    if (lvl) {
      return this.state.player.setVolume(vol < 0.9 ? vol + 0.1 : 1);
    }

    return this.state.player.setVolume(vol > 0.1 ? vol - 0.1 : 0);
  }

  setTrackInfo = track => {
    track.getInfoAsync()
      .then(response => this.setState({ metaData: response.getMetadata() }))
      .catch(err => console.log(err));
  }

  buildPlayer = () => {
    const { channelId, accessToken } = this.state;
    const { play: playStatus } = this.context.location.query;

    const player = new Channel.Player(channelId, accessToken);

    player.setVolume(defaultVolume());
    setPlayerStatus(player, playStatus);

    player.on('track-playback-started', track => this.setTrackInfo(track));
    player.on('track-position', (track, position, duration) =>
      this.renderTrackPosition(track, position, duration));

    this.setState({ player });
  }

  fetchData = id =>
    recordFilesForTagItems([id])
      .offset(this.state.offset).limit(LIMIT)
      .fetch()
      .on('fetch', (_, __, data) => {
        this.setState({
          track: recordFileToMap(data.toJS()),
          offset: this.state.offset + LIMIT,
          channelId: 'fd9a7d1c-a387-40a0-b876-2799668d6f9d', // TODO replace with audioasyl id
          accessToken: 'demo',
        });

        this.buildPlayer();
      })
      .on('error', (_, __, err) => console.log('error', err));

  renderTrackPosition = (track, position, duration) => {
    this.setState({
      progress: (position / duration) * 100,
      position,
    });
  }

  render() {
    const { play: status, id } = this.context.location.query;
    const position = moment.duration(this.state.position || 0);
    const duration = moment.duration(this.state.metaData.duration || 0);

    if (this.state.track && id && status) {
      return (
        <div className="Player">
          <div className="Player-buttons">
            <button
              className="Player-button minimalize"
              onClick={this.props.minimalize}
            >
              <Icon icon="" />
            </button>
            <button
              className="Player-button close"
              onClick={this.props.close}
            >
              <Icon icon="" />
            </button>
          </div>
          <div className="Player-cover">
            <img
              className="Player-cover-img"
              src=""
              alt={""}
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
              <button className="Player-console-button prev">
                <Icon icon="prev" />
              </button>
              <button
                className="Player-console-button play"
                onClick={e => play(e, id, this.context)}
              >
                <Icon icon={iconMap[status]} />
              </button>
              <button className="Player-console-button next">
                <Icon icon="next" />
              </button>
            </div>
          </div>
          {this.state.player && <div className="Player-volume" onWheel={this.setVolume}>
            <Icon icon="volume-medium" />
            <div className="Player-volume-bar">
              <div className="Player-volume-bar--fill" style={{ width: `${this.state.player.getVolume() * 100}%` }} />
            </div>
          </div>}
        </div>
      );
    }

    return null;
  }
}

const defaultVolume = () =>
  localStorage.getItem('playerVolume') || 0.5;

const setPlayerStatus = (player, status) => (
  status === 'play' ? player.start() : player.stop()
);

const LIMIT = 3;
const iconMap = {
  pause: 'play-1',
  play: 'pause',
};

Player.propTypes = {
  close: PropTypes.func,
  minimalize: PropTypes.func,
};

Player.contextTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
};

export default Player;
