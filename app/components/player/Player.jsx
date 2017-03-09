import React, { PropTypes } from 'react';

import { recordFilesForTagItems } from '../../queries/recordItem';
import { recordFileToMap } from '../../parsers/recordFile';
import { play } from '../../utils';
import Icon from '../Icon';

import './Player.scss';
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {
    this.fetchData(this.context.location.query.id);
  }

  componentWillReceiveProps = (nextProps, nextContext) => {
    const { id } = this.context.location.query;
    const { id: idNext } = nextContext.location.query;

    if (id !== idNext) { this.fetchData(idNext); }
  }

  fetchData = id =>
    recordFilesForTagItems([id])
      .fetch()
      .on('fetch', (_, __, data) => this.setState({ track: recordFileToMap(data.toJS()) }))
      .on('error', (_, __, err) => console.log('error', err));

  render() {
    console.log(this.state);
    const { play: status, id } = this.context.location.query;
    if (this.state.track && id && status) {
      const artist = findPlayerItem(this.props.items, id);
      const img = artist.images[0];

      return (
        <div className="Player">
          <div className="Player-buttons">
            <button
              className="Player-button minimalize"
              onClick={this.props.minimalize}
            >
              <Icon icon='' />
            </button>
            <button
              className="Player-button close"
              onClick={this.props.close}
            >
              <Icon icon=''/>
            </button>
          </div>
          <div className="Player-cover">
            <img
              className="Player-cover-img"
              src={img ? img.url : placeholder }
              alt={artist.name}
            />
            <div>{artist.name}</div>
          </div>
          <div className="Player-console">
            <div className="Player-console-progress">
              <div className="Player-console-progress-bar">
                <div
                  className="Player-console-progress-bar--fill"
                  style={{ width: `${Math.floor((Math.random() * 100))}%` }}
                />
              </div>
              <div className="Player-console-progress-time">5:32</div>
            </div>
            <div className="Player-console-buttons">
              <button className="Player-console-button prev">
                <Icon icon="prev" />
              </button>
              <button
                className="Player-console-button play"
                onClick={e => play(e, artist, this.context)}
              >
                <Icon icon={iconMap[status]} />
              </button>
              <button className="Player-console-button next">
                <Icon icon="next" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}

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
