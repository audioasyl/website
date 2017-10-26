import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';

export default class Footer extends Component {


  state = { loop: true };
  
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
      <div className="Footer">
        <div className="PlayerIconContainer">
          <div className="PlayerIcon" />
        </div>
        <div className="FooterContent">
          <marquee
            ref={ref => { this.marquee = ref; }}
            id="footerText"
            behavior="scroll"
            direction="left"
            scrollamount={36}
            onClick={this.toogleAnimation}
          >
            ::: Welcome my friends! Welcome my friends! Welcome my friends! Welcome my friends!
          </marquee>
        </div>
      </div>
    );
  }
}
