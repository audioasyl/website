import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import TileLabel from './TileLabel';
import LikeButton from './LikeButton';
import PlayButton from './PlayButton';
import placeholder from '../../public/images/placeholder.png';
import { recordFilesForTagItems, recordFiles } from '../queries/recordItem';


window.ri = recordFilesForTagItems;
window.rf = recordFiles;

import './AudioTile.scss';
export default class AudioTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderImage() {
    const img = this.props.audio.images[0];

    return (
      <img
        className="AudioTile-cover"
        src={img ? img.url : placeholder}
        alt={this.props.audio.name}
      />
    );
  }

  renderLiveBadge = () => (this.props.isLive && <TileLabel type="live" />)

  renderFreshBadge = () => (this.props.isFresh && <TileLabel type="fresh" />)

  render() {
    const { audio, type, isSpecial, likes } = this.props;
    const audioTileClasses = classNames(
      'AudioTile',
      { 'AudioTile-big': isSpecial }
    );
    if (audio.name === 'Andaloop') {
      debugger;
    }
    return (
      <Link to={`/${type}/details/${audio.id}`} className={audioTileClasses}>
        {this.renderLiveBadge()}
        {this.renderFreshBadge()}
        <PlayButton audioID={audio.id} />
        {/* this.renderImage() */}
        <div className="AudioTile-info">
          <div className="AudioTile-info-bold-wrapper">
            <div className="AudioTile-info-bold">
              {audio.name}
            </div>
            <LikeButton
              likes={likes}
              itemID={audio.id}
              storageKey={`${type}_likes`}
            />
          </div>
        </div>
      </Link>
    );
  }
}

AudioTile.propTypes = {
  isLive: PropTypes.bool,
  isFresh: PropTypes.bool,
  isSpecial: PropTypes.bool,
  likes: PropTypes.array.isRequired,
  audio: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['filters', 'genre', 'authors', 'series']).isRequired,
};

AudioTile.contextTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
};

AudioTile.defaultProps = {
  isLive: false,
  isFresh: false,
  isSpecial: false,
};
