import React, { PropTypes } from 'react';
import { map } from 'lodash';

import Icon from '../Icon';
import Header from '../header/MainHeader';
import { tagCategoryWithTagItems } from '../../queries/tagCategory';


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

    this.setState({ isLoading: true });
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
    return (
      <div className="TileCarousel">
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

TileCarousel.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default TileCarousel;
