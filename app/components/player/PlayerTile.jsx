import React, { PropTypes } from 'react';

import './PlayerTile.scss';
class PlayerTile extends React.Component {
  componentWillMount = () => {

  }

  render() {
    return (
      <div className="PlayerTile">

      </div>
    );
  }
}

PlayerTile.propTypes = {

};

PlayerTile.contextType = {
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default PropTypes;
