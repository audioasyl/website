import React from 'react';
import Icon from './Icon';

import './TilePlaceholder.scss';
const TilePlaceholder = () => (
  <div className="TilePlaceholder">
    <Icon icon="placeholder" />
    <div className="TilePlaceholder-text">Results not found.</div>
  </div>
);

export default TilePlaceholder;
