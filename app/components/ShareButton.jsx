import React, { PropTypes } from 'react';

// import './ShareButton.scss';
class ShareButton extends React.Component {
  componentWillMount() {
    console.log('dupa');
  }

  onClink = () => {
    FB.ui({
      method: 'share',
      // display: 'popup',
      href: 'http://audioasyl.dokkunew.swmansion.com',
    }, function(response){});
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
