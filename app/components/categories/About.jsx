import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import AboutContent from './AboutContent';

import './About.scss';
import './Categories.scss';

class About extends React.Component {

  render() {
    return (
      <div className="Category">
        <div className="Category-anchor" id="about" ref="anchor" />
        <div className="Category-section">
          <div className="Category-title-container"><Link to="#" className="Category-section-title">ABOUT&nbsp;</Link></div>
        </div>
        <AboutContent />
      </div>
    );
  }
}

About.propTypes = {
  likes: PropTypes.array,
  freshRecordIds: PropTypes.array,
  category: PropTypes.object.isRequired,
  metaData: PropTypes.object.isRequired,
};

About.defaultProps = {
  freshRecordIds: [],
  likes: [],
};

export default About;
