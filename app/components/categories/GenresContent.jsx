import React, { PropTypes } from 'react';
import Marquee from 'react-marquee';
import './Categories.scss';

export default class GenresContent extends React.Component {
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
    this.state = {};
  }

  render() {
    return (
      <div className="catergory-container">
        <Marquee text={this.props.audio.name} loop />
      </div>
    );
  }
}
