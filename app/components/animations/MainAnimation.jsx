import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MainAnimation extends Component {
  static propTypes = {
    windowWidth: PropTypes.number.isRequired,
    windowHeight: PropTypes.number.isRequired,
  };

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

  render() {
    return (
      <div style={{ fontSize: 1250, fontFamily: 'RobotoBold', top: -250, position: 'relative', height: 1000 }}>
        {/* <canvas id="animationCanvas" width="200" height="100">
          Your browser does not support the HTML5 canvas tag.
        </canvas>
        {this.draw()} */}
        AUDIOASYL
      </div>
    );
  }
}
