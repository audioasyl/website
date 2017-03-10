import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './icon.scss';
const Icon = props => {
  const iconProps = {
    ...props,
    className: classNames(
      `icon-${glyphsmap[props.icon]}`,
      props.className,
    ),
  };

  if (props.icon in glyphsmap) {
    return (
      <span {...iconProps} />
    );
  }

  /* eslint no-console: ["error", { allow: ["warn"] }] */
  console.warn('Glyph not found', glyphsmap[props.icon]);
  return (
    <span className="icon-info" />
  );
};

const glyphsmap = {
  facebook: 'facebook',
  mute: 'volume-mute2',
  speaker: 'speaker',
  twitter: 'twitter',
  search: 'search',
  minus: 'minus',
  pause: 'pause',
  heart: 'heart',
  cross: 'cross',
  play: 'play',
  prev: 'prev',
  next: 'next',
  'play-1': 'play-1',
  'heart-empty': 'heart-empty',
  'volume-medium': 'volume-medium',
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
