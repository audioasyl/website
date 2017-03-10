import React, { PropTypes } from 'react';

import Description from './Description';

import './Genre.scss';
class Genre extends React.Component {
  render() {
    return (
      <div className="Genre">
        <Description />
        <div className="Placeholder" />
      </div>
    );
  }
}

Genre.propTypes = {

};

export default Genre;
