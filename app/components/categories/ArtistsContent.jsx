import React, { PropTypes } from 'react';
import './Categories.scss';

export default class ArtistsConent extends React.Component {
  static propTypes = {
    properties: PropTypes.object,
    likes: PropTypes.array.isRequired,
    audio: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['filters', 'genre', 'authors', 'series']).isRequired,
  }

  static contextTypes = {
    router: PropTypes.object,
    location: PropTypes.object,
  };

  static defaultProps = {
    properties: {},
  };

  constructor(props) {
    super(props);
    this.state = { loop: true };
  }

  toogleAnimation = () => {
    if (this.state.loop) {
      this.marquee.stop();
      this.setState({ loop: false });
    } else {
      this.marquee.start();
      this.setState({ loop: true });
    }
  }

  render() {
    return (
      <div className="catergory-container">
        <div className="resultMarquee">{this.props.audio.name}</div>
      </div>
    );
  }
}
