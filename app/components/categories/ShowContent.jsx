import React, { PropTypes } from 'react';
import './Categories.scss';
import './Show.scss';

export default class ShowConent extends React.Component {
  static propTypes = {
    properties: PropTypes.object,
    likes: PropTypes.array.isRequired,
    audio: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['filters', 'genre', 'authors', 'series']).isRequired,
    onClick: PropTypes.func.isRequired,
    isClicked: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object,
    location: PropTypes.object,
  };

  static defaultProps = {
    properties: {},
  };

  setColor() {
    if (this.props.isClicked === this.props.audio.id) {
      return 'black';
    }
    return 'white';
  }

  setBackground() {
    if (this.props.isClicked === this.props.audio.id) {
      return 'white';
    }
    return 'black';
  }

  handleItemClick = () => {
    this.props.onClick(this.props.audio);
  }

  renderStyles() {
    const styles = this.props.audio.author || ['HOUSE', 'METAL'];
    return styles.map(item => `#${item} `);
  }

  render() {
    const name = this.props.audio.name || 'SOME NAME';
    const author = this.props.audio.author || 'DJ HORSE';
    return (
      <div
        className="catergory-container Category-show"
        onClick={this.handleItemClick}
        style={{ color: this.setColor(), background: this.setBackground() }}
      >
        <div>{name}</div>
        <div>&#9658;&#09;by {author}</div>
        <div>{this.renderStyles()}</div>
      </div>
    );
  }
}
