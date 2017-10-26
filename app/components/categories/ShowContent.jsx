import React, { PropTypes } from 'react';
import './Categories.scss';
import './Show.scss';

export default class ShowConent extends React.Component {
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
      <div className="catergory-container Category-show">
        <div>{this.props.audio.name}</div>
      </div>
    );
  }
}
