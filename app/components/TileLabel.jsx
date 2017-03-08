import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './TileLabel.scss';
const TileLabel = ({ type }) => {
  const labelClasses = classNames(
    'TileLabel',
    `TileLabel--${type}`,
  );

  return (
    <div className={labelClasses}>
      {type}
    </div>
  );
};

TileLabel.propTypes = {
  type: PropTypes.string.isRequired,
};

export default TileLabel;
