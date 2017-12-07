import React, { PropTypes } from 'react';
import './Categories.scss';
import './News.scss';

export default class NewsConent extends React.Component {
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

  renderStyles() {
    const styles = this.props.audio.author || ['HOUSE', 'METAL'];
    return styles.map(item => `#${item} `);
  }

  render() {
    const liveNow = 'LIVE NOW!';
    const name = this.props.audio.name || 'SOME NAME';
    return (
      <div className="Catergory-common Category-news">
        <div>{liveNow}</div>
        <div className="Category-news-text">{name}</div>
      </div>
    );
  }
}
