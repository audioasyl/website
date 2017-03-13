import React, { PropTypes } from 'react';

import Show from './Show';
import Type from './Type';
import Icon from '../Icon';
import Genre from './Genre';
import Author from './Author';
import Player from '../player/Player';
import { Categories } from '../../enums';
import Header from '../header/MainHeader';
import { tagCategoriesToMap } from '../../parsers/category';
import djBg from '../../../public/images/dj-background.jpg';
import { tagItemsWithMetaData } from '../../queries/tagItem';
import { tagCategoriesSchemas } from '../../queries/tagCategory';
import genreBg from '../../../public/images/genre-background.jpg';
import albumBg from '../../../public/images/album-background.jpg';
import detailsBg from '../../../public/images/details-background.jpg';

import './TileDetails.scss';
class TileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getChildContext = () => ({
    router: this.props.router,
    location: this.props.location,
  })

  componentWillMount = () => {
    this.fetchData();
    this.fetchSchema();
  }

  onCloseClick = () =>
    this.props.router.goBack()

  fetchSchema = () =>
    tagCategoriesSchemas()
      .where('key', 'eq', this.props.router.params.category)
      .fetch()
      .on('fetch', (_, __, data) => {
        this.setState({ category: tagCategoriesToMap(data.toJS()).authors });
      })
      .on('error', (_, __, err) => {
        console.log('error', err);
      });

  fetchData = () =>
    tagItemsWithMetaData([this.props.router.params.id])
      .fetch()
      .on('fetch', (_, __, data) => {
        this.setState({ item: data.toJS()[0] });
      })
      .on('error', (_, __, err) => {
        console.log('error', err);
      });

  renderContent = () => {
    const { category, item } = this.state;
    switch (this.props.router.params.category) {
    case Categories.SHOW:
      return (<Show category={category} show={item} />);
    case Categories.AUTHOR:
      return (<Author category={category} author={item} />);
    case Categories.GENRE:
      return (<Genre category={category} genre={item} />);
    case Categories.TYPE:
      return (<Type category={category} type={item} />);
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
