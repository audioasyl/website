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
    const name = this.props.audio.name || 'SOME NAME';
    const date = this.props.audio.date || 'FRIDAY 19.01.2017';
    const author = this.props.audio.author || 'DJ HORSE';
    return (
      <div className="catergory-container Category-news">
        <div>{date}</div>
        <div className="News-red">{name}</div>
        <div className="News-author">&#9658;&#09;{author}</div>
        <div className="News-style">{this.renderStyles()}</div>
      </div>
    );
  }
}
