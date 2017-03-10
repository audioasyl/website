import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import TileLabel from './TileLabel';
import LikeButton from './LikeButton';
import PlayButton from './PlayButton';
import placeholder from '../../public/images/placeholder.png';

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

  renderLiveBadge = () => (this.props.properties.isLive && <TileLabel type="live" />)

  renderFreshBadge = () => (this.props.properties.isFresh && <TileLabel type="fresh" />)

  render() {
    const { id, play } = this.context.location.query;
    const { audio, type, likes, properties } = this.props;
    const audioTileClasses = classNames(
      'AudioTile',
      { 'AudioTile-big': properties.isSpecial }
    );

    return (
      <Link
        to={{
          pathname: `/${type}/details/${audio.id}`,
          query: { id, play },
        }}
        className={audioTileClasses}
      >
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
  properties: PropTypes.object,
  likes: PropTypes.array.isRequired,
  audio: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['filters', 'genre', 'authors', 'series']).isRequired,
};

AudioTile.contextTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
};

AudioTile.defaultProps = {
  properties: {},
};
