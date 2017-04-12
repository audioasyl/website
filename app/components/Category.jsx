import Masonry from 'react-masonry-component';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { map, size, sortBy, lowerCase } from 'lodash';

import AudioTile from './AudioTile';
import TilePlaceholder from './TilePlaceholder';
import { metaDataItemsToProperties } from '../parsers/metadataItems';

import './Category.scss';
class Category extends React.Component {
  renderTiles = () => {
    const {
      likes,
      category,
      metaData,
      freshRecordIds,
    } = this.props;

    return map(sortBy(category.tag_items, item => lowerCase(item.name)), tagItem => {
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
        {
          size(category.tag_items)
            ? (
              <Masonry
                options={masonryOptions}
                className="Category-tiles"
              >
                <div className="grid-sizer" />
                {this.renderTiles()}
              </Masonry>
            )
            : <TilePlaceholder />
        }
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
  likes: PropTypes.array,
  freshRecordIds: PropTypes.array,
  category: PropTypes.object.isRequired,
  metaData: PropTypes.object.isRequired,
};

Category.defaultProps = {
  freshRecordIds: [],
  likes: [],
};

export default Category;
