import React, { PropTypes } from 'react';
import './Categories.scss';

export default class StyleContent extends React.Component {
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

  constructor(props) {
    super(props);
    this.state = {};
  }

  isClicked() {
    if (this.props.isClicked === this.props.audio.id) {
      return true;
    }
    return false;
  }

  handleItemClick = () => {
    this.props.onClick(this.props.audio);
  }

  renderStyles() {
    const styles = this.props.audio.author || ['STYLE', 'STYLE'];
    return styles.map(item => `#${item} `);
  }

  renderDetails() {
    if (this.isClicked()) {
      return (
        <div className="Category-details-container">
          <div className="Category-details-field">
            <div className="Category-details-field-description">
              Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi. Aliquam erat ac ipsum. Integer aliquam purus. Quisque lorem tortor fringilla sed, vestibulum id, eleifend justo vel bibendum sapien massa ac turpis faucibus orci luctus non, consectetuer lobortis quis, varius in, purus. Integer ultrices posuere cubilia Curae, Nulla ipsum dolor lacus, suscipit adipiscing. Cum sociis natoque penatibus et ultrices volutpat.
            </div>
          </div>
          <div className="Category-details-field">
            <div className="Category-details-field-right">
              <div className="Category-details-field-item">MORE INFO</div>
              <div className="Category-details-field-item Link">link</div>
              <div style={{ height: 20, width: '100%' }} />
              <div className="Category-details-field-item">HOUSE Shows</div>
              <div className="Category-details-field-item">Audioasyl Special</div>
              <div style={{ height: 20, width: '100%' }} />
              <div className="Category-details-field-item">SHARE ON</div>
              <div className="Category-details-field-item Link">facebook</div>
              <div style={{ height: 20, width: '100%' }} />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const name = this.props.audio.name || 'NAME';
    return (
      <div
        className="Catergory-common-style"
        style={{
          color: this.isClicked() ? 'white' : 'black',
          background: this.isClicked() ? 'black' : 'white' }}
      >
        <div className="Category-common-style-inner">
          <div onClick={this.handleItemClick} style={{ width: '100%' }}>{name}</div>
          <div
            className="Player-icon-container"
            style={{
              background: this.isClicked() ? 'black' : 'white',
              visibility: this.isClicked() ? 'visible' : 'hidden' }}
          >
            <div
              className="Player-icon"
              style={{
                filter: this.isClicked() ? 'invert(100%)' : 'invert(0%)',
                visibility: this.isClicked() ? 'visible' : 'hidden' }}
            />
          </div>
        </div>
        {this.renderDetails()}
      </div>
    );
  }
}
