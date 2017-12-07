import React, { PropTypes } from 'react';
import './Categories.scss';

export default class TypeConent extends React.Component {
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

  render() {
    return (
      <div className="Catergory-common Category-type">{this.props.audio.name}</div>
    );
  }
}
