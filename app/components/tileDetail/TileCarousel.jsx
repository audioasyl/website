import React, { PropTypes } from 'react';
import { map } from 'lodash';

import Icon from '../Icon';
import Header from '../header/Header';
import { tagCategoryWithTagItems } from '../../queries/tagCategory';
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

import './TileCarousel.scss';
class TileCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIdx: 0,
    };
  }

  componentWillMount = () => {
    const { category, id } = this.props.router.params;

    this.setState({
      isLoading: true,
      img: images[Math.floor(Math.random() * images.length)],
    });
    tagCategoryWithTagItems([category], ['id'])
      .fetch()
      .on('fetch', (_, __, data) => {
        const categories = data.toJS()[0];
        const tagItems = map(categories.tag_items, item => item.id);

        this.setState({
          activeIdx: tagItems.indexOf(id),
          categories,
          tagItems,
        });
      })
      .on('error', (_, __, err) => console.log('error', err));
  }

  moveCarousel = (step = 1) => {
    let nextIdx = this.state.activeIdx + step;
    const tagItemsCount = this.state.tagItems.length;

    nextIdx = nextIdx < 0 ? tagItemsCount - 1 : nextIdx;
    nextIdx = nextIdx >= tagItemsCount ? 0 : nextIdx;
    this.setState({ activeIdx: nextIdx });

    this.props.router.replace({
      pathname: `/${this.props.router.params.category}/details/${this.state.tagItems[nextIdx]}`,
      query: this.props.location.query,
    });
  }

  render() {
    const style = { backgroundImage: `url('${this.state.img}')` };

    return (
      <div className="TileCarousel" style={style}>
        <Header />
        <button
          className="TileCarousel-button TileCarousel-left"
          onClick={() => this.moveCarousel(-1)}
        >
          <Icon icon="left" />
        </button>
        {this.props.children}
        <button className="TileCarousel-button TileCarousel-right" onClick={() => this.moveCarousel(1)}>
          <Icon icon="right" />
        </button>
      </div>
    );
  }
}

const images = [
  backgroundUrl1, backgroundUrl2, backgroundUrl3, backgroundUrl4, backgroundUrl5,
  backgroundUrl6, backgroundUrl7, backgroundUrl8, backgroundUrl9, backgroundUrl10,
  backgroundUrl11, backgroundUrl12, backgroundUrl13, backgroundUrl14, backgroundUrl15,
];

TileCarousel.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default TileCarousel;
