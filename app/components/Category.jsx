import Masonry from 'react-masonry-component';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';

import { getLikes } from '../utils';
import AudioTile from './AudioTile';
import { metaDataItemsToProperties } from '../parsers/metadataItems';

import './Category.scss';
class Category extends React.Component {
  // scrollToElement = e => {
  //   console.log(this.context.location.hash, `#${this.props.category.key}`, e.offsetTop, e.offsetHeight);
  //   if (this.context.location && this.context.location.hash === `#${this.props.category.key}`) {
  //     const a = e.parentElement.offsetTop;
  //     const b = e.offsetHeight
  //     console.log(a, b, a+b);
  //     window.scroll(0, a+b);
  //   }
  // }

  renderTiles = () => {
    const {
      category,
      metaData,
      freshRecordIds,
    } = this.props;

    const likes = getLikes(`${category.key}_likes`);

    return map(category.tag_items, tagItem => {
      const itemProperties =
        metaDataItemsToProperties(metaData[tagItem.id].metadata_items, category.metadata_schemas);

      itemProperties.isFresh = freshRecordIds.indexOf(tagItem.id) >= 0;

      return (
        <AudioTile
          likes={likes}
          audio={tagItem}
          key={tagItem.id}
          type={category.key}
          properties={itemProperties}
          schema={category.metadata_schemas}
        />
      );
    });
  };

  render() {
    const { category } = this.props;
    return (
      <div className="Category">
        <div className="Category-anchor" id={category.key} ref="anchor" />
        <div className="Category-section">
          <Link to="#" className="Category-section-title">{category.name}</Link>
        </div>
        <Masonry
          options={masonryOptions}
          className="Category-tiles"
        >
          <div className="grid-sizer" />
          {this.renderTiles()}
        </Masonry>
      </div>
    );
  }
}


const masonryOptions = {
  percentPosition: true,
  columnWidth: '.grid-sizer',
  itemSelector: '.AudioTile',
};

Category.propTypes = {
  freshRecordIds: PropTypes.array,
  category: PropTypes.object.isRequired,
  metaData: PropTypes.object.isRequired,
};

Category.defaultProps = {
  freshRecordIds: [],
};

export default Category;
