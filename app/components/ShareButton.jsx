import React, { PropTypes } from 'react';
import Icon from './Icon';

import './ShareButton.scss';
class ShareButton extends React.Component {

  onClink = () => {
    FB.ui({ // eslint-disable-line no-undef
      method: 'share',
      display: 'popup',
      href: window.location.href,
    }, () => {});
  }

  render() {
    return (
      <button className="ShareButton" style={{ color: 'white' }} onClick={this.onClink}>
        <span>Share on</span>&nbsp;
        <Icon icon="facebook" />
      </button>
    );
  }
}

ShareButton.propTypes = {
};

ShareButton.contextTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
};

export default ShareButton;
