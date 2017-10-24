import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import './LogoButton.scss';
const LogoButton = (props, { location }) => (
  <div className="LogoButton">
    <Link
      to={{
        pathname: '/',
        query: {
          id: location.query.id,
          play: location.query.play,
          channel_id: location.query.channel_id,
        },
      }}
    >
      <div className="LogoButton">AUDIOASYL</div>
    </Link>
  </div>
);


LogoButton.contextTypes = {
  location: PropTypes.object.isRequired,
};

export default LogoButton;
