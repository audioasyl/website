import React from 'react';

class MixcloudPlayer extends React.Component {
  createUri(user, mix) {
    return "https%3A%2F%2Fwww.mixcloud.com%2F" + user + "%2F" + mix + "%2F";
  }

  render() {
    return (
      <iframe
        width="100%"
        height="60
        src={"https://www.mixcloud.com/widget/iframe/?embed_type=widget_standard&amp;embed_uuid=9107eeba-eaf1-423a-9a70-bc4e6946579d&amp;feed=" + this.createUri(this.props.User, this.props.Mix) + "&amp;hide_artwork=1&amp;hide_cover=1&amp;hide_tracklist=1&amp;mini=1&amp;replace=0"} frameBorder="0">
        
      </iframe>
    );
  }
}

export default MixcloudPlayer
