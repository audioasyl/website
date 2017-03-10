import React, { PropTypes } from 'react';

import Show from './Show';
import Type from './Type';
import Icon from '../Icon';
import Genre from './Genre';
import Author from './Author';
import Player from '../player/Player';
import { Categories } from '../../enums';
import Header from '../header/MainHeader';

import './TileDetails.scss';
class TileDetails extends React.Component {
  getChildContext = () => ({
    router: this.props.router,
    location: this.props.location,
  })

  onCloseClick = () => {
    this.props.router.goBack();
  }

  renderContent = () => {
    switch (this.props.router.params.category) {
    case Categories.SHOW:
      return (<Show />);
    case Categories.AUTHOR:
      return (<Author />);
    case Categories.GENRE:
      return (<Genre />);
    case Categories.TYPE:
      return (<Type />);
    default:
      return null;
    }
  }

  render() {
    const style = { backgroundImage: `url('${categoryToImg(this.props.router.params.category)}')` };
    return (
      <div className="TileDetails" style={style} >
        <Header />
        <button className="TileDetails-close" onClick={this.onCloseClick}>
          <Icon icon="cross" />
        </button>
        <div className="TileDetails-main">
          {this.renderContent()}
        </div>
        <div />
        <Player />
      </div>
    );
  }
}

const categoryToImg = category => {
  const path = img => `../../../images/${img}.jpg`;
  switch (category) {
  case Categories.AUTHOR:
    return path('dj-background');
  case Categories.GENRE:
    return path('genre-background');
  case Categories.TYPE:
    return path('album-background');
  default:
    return path('details-background');
  }
};

TileDetails.propTypes = {
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

TileDetails.childContextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default TileDetails;
