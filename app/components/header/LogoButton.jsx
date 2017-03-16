import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import logo from '../../../public/images/logo.png';

import './LogoButton.scss';
const LogoButton = (props, { location }) => (
  <div className="LogoButton">
    <Link
      to={{
        pathname: '/',
        query: { id: location.query.id, play: location.query.play },
      }}
    >
      <img className="LogoButton-logo" src={logo} alt="RadioKit" />
    </Link>
  </div>
);


LogoButton.contextTypes = {
  location: PropTypes.object.isRequired,
};

export default LogoButton;
