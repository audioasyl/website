import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Helmet from 'react-helmet';

import Player from './Player';

import './AudioasylPlayer.scss';
class AudioasylPlayer extends React.Component {
  getChildContext = () => ({
    router: this.props.router,
    location: this.props.location,
  });

  render() {
    const audioasylPlayerClasses = classNames(
      'AudioasylPlayer',
      { 'AudioasylPlayer--opened': !!this.props.location.query.id && !this.props.router.params.id }
    );

    return (
      <div className={audioasylPlayerClasses} >
        <Helmet>
          <title>Audioasyl</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <meta charSet="utf-8" />
        </Helmet>
        {this.props.children}
        <Player />
      </div>
    );
  }
}

AudioasylPlayer.propTypes = {
  children: PropTypes.object.isRequired,
};

AudioasylPlayer.propTypes = {
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

AudioasylPlayer.childContextTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
};


export default AudioasylPlayer;
