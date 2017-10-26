import React, { PropTypes } from 'react';
import './Categories.scss';
import './About.scss';

export default class AboutConent extends React.Component {
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
      <div className="catergory-container Category-about">
        <div>
          Mission of Audioasyl:<br />
          <div className="Category-about-text">
            Live Streams Platform Audio only<br />
            Easy Streaming for Artists / Hosts<br />
            Connecting People and Artists trough their live Sets<br />
            Live is Art enough<br />
          </div>
        </div>
        <div className="Category-about-footer" />
      </div>
    );
  }
}
