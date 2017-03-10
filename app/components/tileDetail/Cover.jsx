import { Scrollbars } from 'react-custom-scrollbars';
import React, { PropTypes } from 'react';
import { map, take } from 'lodash';

import PlayButton from '../PlayButton';

import './Cover.scss';
const Cover = ({ artist, albums }) => {
  const img = artist.images && artist.images[0];
  const styles = { backgroundImage: `url('${img ? img.url : 'placeholder'}')` }

  return (
    <div className="Cover" style={styles}>
      <div className="Cover-header">
        {artist.name}
      </div>
      <PlayButton audioID={artist.id} />
      <div className="Cover-footer">
        <Scrollbars style={{ height: '100%' }}>
          <div className="Cover-footer-header">
            podcast longer description
          </div>
          <div className="Cover-footer-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus sodales enim
            id varius. Donec ut leo eget quam vehicula finibus non non mauris. In vitae congue
            ligula.
          </div>
          <div className="Cover-footer-track">
            <div className="Cover-footer-track-header">
              tracklist:
            </div>
            <ul>
              {map(take(albums, 3), album => <li key={album.id}>{album.name}</li>)}
            </ul>
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

Cover.propTypes = {
  artist: PropTypes.object,
  albums: PropTypes.array,
};

Cover.contextTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
};

Cover.defaultProps = {
  artist: {},
  albums: [],
};

export default Cover;
