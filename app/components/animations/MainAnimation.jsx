import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MainAnimation.scss';

export default class MainAnimation extends Component {
  static propTypes = {
    windowWidth: PropTypes.number.isRequired,
    windowHeight: PropTypes.number.isRequired,
  };

  state = { loop: true };

  // draw() {
  //   const { windowWidth, windowHeight } = this.props.windowHeight;
  //   const ctx = document.getElementById('animationCanvas').getContext('2d');
  //   for (let i = 0; i < 6; i++) {
  //     for (let j = 0; j < 6; j++) {
  //       ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ', ' +
  //         Math.floor(255 - 42.5 * j) + ', 0)';
  //       ctx.fillRect(j * 25, i * 25, 25, 25);
  //     }
  //   }
  // }

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
      <div className="MainAnimation">
        <div>
          <marquee
            ref={ref => { this.marquee = ref; }}
            id="footerText"
            behavior="scroll"
            direction="left"
            scrollamount={1600}
            scrolldelay={60}
            onClick={this.toogleAnimation}
          >
            AUDIOASYL
          </marquee>
        </div>
      </div>
    );
  }
}
