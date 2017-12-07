import React, { PropTypes } from 'react';

import './LogoButton.scss';
const LogoButton = () => (
  <div>
    <a href="#">
      <div className="LogoButton">AUDIOASYL</div>
    </a>
  </div>
);

LogoButton.contextTypes = {
  location: PropTypes.object.isRequired,
};

export default LogoButton;
