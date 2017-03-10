import React, { PropTypes } from 'react';

import Show from './Show';
import Type from './Type';
import Icon from '../Icon';
import Genre from './Genre';
import Author from './Author';
import Player from '../player/Player';
import { Categories } from '../../enums';
import Header from '../header/MainHeader';
import djBg from '../../../public/images/dj-background.jpg';
import genreBg from '../../../public/images/genre-background.jpg';
import albumBg from '../../../public/images/album-background.jpg';
import detailsBg from '../../../public/images/details-background.jpg';

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
  switch (category) {
  case Categories.AUTHOR:
    return djBg;
  case Categories.GENRE:
    return genreBg;
  case Categories.TYPE:
    return albumBg;
  default:
    return detailsBg;
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
