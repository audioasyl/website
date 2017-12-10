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
    this.state = {
      opened: false,
    };
  }

  onItemClick = () => {
    this.setState({
      opened: !this.state.opened,
    });
  }

  renderStyles() {
    const styles = this.props.audio.author || ['House', 'Metal'];
    return styles.map(item => `${item} `);
  }

  renderDetails() {
    const name = this.props.audio.name || 'SOME NAME';
    if (this.state.opened) {
      return (
        <div className="Category-details-container">
          <div className="Category-details-field">
            <div className="Category-details-field-description">
              Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi. Aliquam erat ac ipsum. Integer aliquam purus. Quisque lorem tortor fringilla sed, vestibulum id, eleifend justo vel bibendum sapien massa ac turpis faucibus orci luctus non, consectetuer lobortis quis, varius in, purus. Integer ultrices posuere cubilia Curae, Nulla ipsum dolor lacus, suscipit adipiscing. Cum sociis natoque penatibus et ultrices volutpat.
            </div>
          </div>
          <div className="Category-details-field">
            <div className="Category-details-field-right">
              <div className="Category-details-field-item">Hosts</div>
              <div className="Category-details-field-item Link">{name}</div>
              <div style={{ height: 20, width: '100%' }} />
              <div className="Category-details-field-item">Style</div>
              <div className="Category-details-field-item">{this.renderStyles()}</div>
              <div className="Category-details-field-item">Type</div>
              <div className="Category-details-field-item">Music</div>
              <div style={{ height: 20, width: '100%' }} />
              <div className="Category-details-field-item">Web</div>
              <div className="Category-details-field-item Link">www.webpage.com</div>
              <div style={{ height: 20, width: '100%' }} />
              <div className="Category-details-field-item" style={{ cursor: 'pointer' }} >SHARE</div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const liveNow = 'LIVE NOW!';
    const name = this.props.audio.name || 'SOME NAME';
    return (
      <div className="Catergory-common Category-news">
        <div onClick={this.onItemClick}>
          <div>{liveNow}</div>
          <div className="Category-news-text">{name}</div>
        </div>
        {this.renderDetails()}
      </div>
    );
  }
}
