import Masonry from 'react-masonry-component';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';

import { getLikes } from '../utils';
import AudioTile from './AudioTile';
import { metaDataItemsToProperties } from '../parsers/metadataItems';

import './Category.scss';
const Category = ({ category, metaData }) => (
  <div className="Category">
    <div className="Category-section" id="artists-section">
      <Link to="#" className="Category-section-title">{category.name}</Link>
    </div>
    <Masonry
      options={masonryOptions}
      className="Category-tiles"
    >
      <div className="grid-sizer" />
      {renderTiles(category, metaData, category.metadata_schemas)}
    </Masonry>
  </div>
);

const renderTiles = (category, metaData, dataSchema) => {
  const likes = getLikes(`${category.key}_likes`);

  return map(category.tag_items, tagItem => {
    const itemProperties =
      metaDataItemsToProperties(metaData[tagItem.id].metadata_items, dataSchema);

    return (
      <AudioTile
        likes={likes}
        audio={tagItem}
        key={tagItem.id}
        type={category.key}
        schema={dataSchema}
        isLive={!!itemProperties.live}
        isFresh={!!itemProperties.fresh}
        isSpecial={!!itemProperties.special}
      />
    );
  });
};

const masonryOptions = {
  percentPosition: true,
  columnWidth: '.grid-sizer',
  itemSelector: '.AudioTile',
};

Category.propTypes = {
  category: PropTypes.object.isRequired,
  metaData: PropTypes.object.isRequired,
};

export default Category;
