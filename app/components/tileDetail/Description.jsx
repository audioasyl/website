import React, { PropTypes } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import Icon from '../Icon';

const Description = () => (
  <div className="Description">
    <Scrollbars style={{ height: '100%' }}>
      <div className="Description-header">
        {/* this.state.artist.name */}
      </div>
      <div className="Description-content">
        <div className="Description-content-label">
          About:
        </div>
        <div className="Description-content-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fringilla eget
          odio quis molestie. Donec enim lorem, auctor nec laoreet efficitur, efficitur ut
          odio. Cras in aliquam quam. Etiam mollis pellentesque magna, sit amet finibus elit
          tempor ut. Ut lectus velit, placerat sed enim vitae, mattis tincidunt felis.
        </div>
        <div className="Description-content-label">
          Genres:
        </div>
        <ul>
          {/* map(this.state.artist.genres, genre => <li key={genre}>{genre}</li>) */}
        </ul>
      </div>
      <div className="Description-links">
        <Icon icon="facebook" />
        <Icon icon="twitter" />
      </div>
    </Scrollbars>
  </div>
);

Description.propTypes = {

}

export default Description;
