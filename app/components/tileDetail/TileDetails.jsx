import React, { PropTypes } from 'react';

import Show from './Show';
import Type from './Type';
import Genre from './Genre';
import Author from './Author';
import { Categories } from '../../enums';
import ContentLoader from '../ContentLoader';
import { tagCategoriesToMap } from '../../parsers/category';
// import djBg from '../../../public/images/dj-background.jpg';
import { tagItemsWithMetaData } from '../../queries/tagItem';
import { tagCategoriesSchemas } from '../../queries/tagCategory';
// import genreBg from '../../../public/images/genre-background.jpg';
// import albumBg from '../../../public/images/album-background.jpg';
// import detailsBg from '../../../public/images/details-background.jpg';
import backgroundUrl1 from '../../../public/images/wallpapers/background1.jpg';
import backgroundUrl2 from '../../../public/images/wallpapers/background2.JPG';
import backgroundUrl3 from '../../../public/images/wallpapers/background3.JPG';
import backgroundUrl4 from '../../../public/images/wallpapers/background4.JPG';
import backgroundUrl5 from '../../../public/images/wallpapers/background5.jpeg';
import backgroundUrl6 from '../../../public/images/wallpapers/background6.jpeg';
import backgroundUrl7 from '../../../public/images/wallpapers/background7.jpg';
import backgroundUrl8 from '../../../public/images/wallpapers/background8.JPG';
import backgroundUrl9 from '../../../public/images/wallpapers/background9.JPG';
import backgroundUrl10 from '../../../public/images/wallpapers/background10.jpg';
import backgroundUrl11 from '../../../public/images/wallpapers/background11.jpg';
import backgroundUrl12 from '../../../public/images/wallpapers/background12.jpg';
import backgroundUrl13 from '../../../public/images/wallpapers/background13.jpg';
import backgroundUrl14 from '../../../public/images/wallpapers/background14.jpg';
import backgroundUrl15 from '../../../public/images/wallpapers/background15.jpg';

import './TileDetails.scss';
class TileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCategoryLoading: false,
      isItemLoading: false,
    };
  }

  componentWillMount = () => {
    this.fetchData(this.props);
    this.fetchSchema(this.props);
  }

  componentWillReceiveProps = nextProps => {
    this.fetchData(nextProps);
    this.fetchSchema(nextProps);
  }

  onCloseClick = () =>
    this.props.router.goBack()

  fetchSchema = props => {
    this.setState({ isCategoryLoading: true });
    tagCategoriesSchemas()
      .where('key', 'eq', props.router.params.category)
      .fetch()
      .on('fetch', (_, __, data) => {
        this.setState({
          category: tagCategoriesToMap(data.toJS())[props.router.params.category],
          isCategoryLoading: false,
        });
      })
      .on('error', (_, __, err) => {
        console.log('error', err);
      });
  }

  fetchData = props => {
    this.setState({ isItemLoading: true });
    tagItemsWithMetaData([props.router.params.id])
      .fetch()
      .on('fetch', (_, __, data) => {
        this.setState({ item: data.toJS()[0] });
        this.setState({ isItemLoading: false });
      })
      .on('error', (_, __, err) => {
        console.log('error', err);
      });
  }
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
    const style = { backgroundImage: `url('${images[Math.floor(Math.random() * images.length)]}')` };
    const { isCategoryLoading, isItemLoading } = this.state;
    if (isCategoryLoading || isItemLoading) {
      return (
        <div className="TileDetails TileDetails-placeholder" style={style} >
          <ContentLoader />
        </div>
      );
    }

    return (
      <div className="TileDetails TileDetails-fadeOut" style={style} >
        <div />
        <button className="TileDetails-close" onClick={this.onCloseClick}>
          Go back to home page
        </button>
        <div className="TileDetails-main">
          {this.renderContent()}
        </div>
        <div />
      </div>
    );
  }
}

const images = [
  backgroundUrl1, backgroundUrl2, backgroundUrl3, backgroundUrl4, backgroundUrl5,
  backgroundUrl6, backgroundUrl7, backgroundUrl8, backgroundUrl9, backgroundUrl10,
  backgroundUrl11, backgroundUrl12, backgroundUrl13, backgroundUrl14, backgroundUrl15,
];

// const categoryToImg = category => {
//   switch (category) {
//   case Categories.AUTHOR:
//     return djBg;
//   case Categories.GENRE:
//     return genreBg;
//   case Categories.TYPE:
//     return albumBg;
//   default:
//     return detailsBg;
//   }
// };

TileDetails.propTypes = {
  router: PropTypes.object.isRequired,
};

TileDetails.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default TileDetails;
