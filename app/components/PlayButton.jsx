import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { play } from '../utils';
import Icon from './Icon';

import './PlayButton.scss';
const PlayButton = ({ audioID, channelID }, context) => {
  const { play: status, id } = context.location.query;
  const isPlaying = status === 'play' && audioID === id;

  const buttonClasses = classNames(
    'PlayButton',
    { 'PlayButton--playing': isPlaying }
  );

  return (
    <button className={buttonClasses} onClick={e => play(e, audioID, channelID, context)}>
      {isPlaying
        ? <span className="Hover-wrapper">
          <Icon icon="pause" />
          <Icon icon="volume-medium" />
        </span>
        : <Icon icon="play" />
      }
    </button>
  );
};

PlayButton.propTypes = {
  audioID: PropTypes.string.isRequired,
  channelID: PropTypes.string.isRequired,
};

PlayButton.contextTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
};

export default PlayButton;
