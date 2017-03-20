import { Scrollbars } from 'react-custom-scrollbars';
import React, { PropTypes } from 'react';
import { map } from 'lodash';

import LikeButton from '../LikeButton';
import { getLikes } from '../../utils';

import Icon from '../Icon';

import './Description.scss';
const Description = ({
  contributors,
  facebookUrl,
  twitterUrl,
  audioID,
  genres,
  header,
  about,
  shows,
}, { router }) => {
  const renderItems = items => (
    <ul>
      {map(items, item => <li key={item}>{item}</li>)}
    </ul>
  );

  const renderGenres = () => (
    <div>
      <div className="Description-content-label">
        Genres:
      </div>
      {renderItems(genres)}
    </div>
  );

  const renderShows = () => (
    <div>
      <div className="Description-content-label">
        Show:
      </div>
      {renderItems(shows)}
    </div>
  );

  const renderContributors = () => (
    <div>
      <div className="Description-content-label">
        Contributors:
      </div>
      {renderItems(contributors)}
    </div>
  );

  return (
    <div className="Description">
      <Scrollbars style={{ height: '100%' }}>
        <div className="Description-header">
          {header}
          <LikeButton
            itemID={audioID}
            storageKey={`${router.params.category}_likes`}
            likes={getLikes(`${router.params.category}_likes`)}
          />
        </div>
        <div className="Description-content">
          {about && (
            <div>
              <div className="Description-content-label">
                About:
              </div>
              <div className="Description-content-text">
                {about}
              </div>
            </div>
          )}
          {genres && renderGenres()}
          {shows && renderShows()}
          {contributors && renderContributors()}
        </div>
        <div className="Description-links">
          {facebookUrl && (<a href={facebookUrl}><Icon icon="facebook" /></a>)}
          {twitterUrl && (<a href={twitterUrl}><Icon icon="twitter" /></a>)}
        </div>
      </Scrollbars>
    </div>
  );
};

Description.propTypes = {
  audioID: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  contributors: PropTypes.array,
  facebookUrl: PropTypes.string,
  twitterUrl: PropTypes.string,
  genres: PropTypes.array,
  shows: PropTypes.array,
};

Description.contextTypes = {
  router : PropTypes.object.isRequired,
};

Description.defaultProps = {
  contributors: null,
  facebookUrl: '',
  twitterUrl: '',
  genres: null,
  shows: null,
};

export default Description;
