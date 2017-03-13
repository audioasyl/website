import React, { PropTypes } from 'react';
import { map } from 'lodash';

import { Scrollbars } from 'react-custom-scrollbars';

import Icon from '../Icon';

import './Description.scss';
const Description = ({ header, about, genres, shows }) => {
  const renderGenres = () => (
    <ul>
      {map(genres, genre => <li key={genre}>{genre}</li>)}
    </ul>
  );
  const renderShows = () => (
    <ul>
      {map(shows, show => <li key={show}>{show}</li>)}
    </ul>
  );

  return (
    <div className="Description">
      <Scrollbars style={{ height: '100%' }}>
        <div className="Description-header">
          {header}
        </div>
        <div className="Description-content">
          <div className="Description-content-label">
            About:
          </div>
          <div className="Description-content-text">
            {about}
          </div>
          <div className="Description-content-label">
            Genres:
          </div>
          {genres && renderGenres()}
          {shows && renderShows()}
        </div>
        <div className="Description-links">
          <Icon icon="facebook" />
          <Icon icon="twitter" />
        </div>
      </Scrollbars>
    </div>
  );
};

Description.propTypes = {
  header: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  genres: PropTypes.array,
  shows: PropTypes.array,
};

Description.defaultProps = {
  genres: null,
  shows: null,
};

export default Description;
