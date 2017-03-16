import { Scrollbars } from 'react-custom-scrollbars';
import React, { PropTypes } from 'react';
import { map, take } from 'lodash';

import PlayButton from '../PlayButton';

import './Cover.scss';
const Cover = ({ audioID, trackList, title, cover, description }) => (
  <div className="Cover" style={{ backgroundImage: cover }}>
    <div className="Cover-header">
      {title}
    </div>
    <PlayButton audioID={audioID} />
    <div className="Cover-footer">
      <Scrollbars style={{ height: '100%' }}>
        <div className="Cover-footer-header">
          {description && 'podcast description'}
        </div>
        <div className="Cover-footer-text">
          {description}
        </div>
        {trackList && <div className="Cover-footer-track">
          <div className="Cover-footer-track-header">
            tracklist:
          </div>
          <ul>
            {map(take(trackList, 3), album => <li key={album.id}>{album.name}</li>)}
          </ul>
        </div>}
      </Scrollbars>
    </div>
  </div>
);

Cover.propTypes = {
  audioID: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  trackList: PropTypes.array,
  cover: PropTypes.string,
};

Cover.contextTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
};

Cover.defaultProps = {
  cover: '',
  trackList: null,
  description: '',
};

export default Cover;
