import React, { PropTypes } from 'react';

// import './ShareButton.scss';
class ShareButton extends React.Component {

  onClink = () => {
    FB.ui({ // eslint-disable-line no-undef
      method: 'share',
      // display: 'popup',
      href: 'http://audioasyl.dokkunew.swmansion.com',
    }, response => {});
  }

  render() {
    return (
      <button style={{ color: 'white' }} onClick={this.onClink}>
        Share
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
