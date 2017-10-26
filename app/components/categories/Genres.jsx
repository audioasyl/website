import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { map, size, sortBy, lowerCase } from 'lodash';
import TilePlaceholder from '../TilePlaceholder';
import { metaDataItemsToProperties } from '../../parsers/metadataItems';
import GenresContent from './GenresContent';

import './Genres.scss';
import './Categories.scss';

class Genres extends React.Component {

  renderContent = () => {
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
      itemProperties.broadcast_channel_id = '15ffeff6-d946-4087-bc5c-ce9912ef222c'; // FIXME!!!!

      return (
        <GenresContent
          likes={likes}
          audio={tagItem}
          type={category.key}
          properties={itemProperties}
          key={tagItem.id}
          schema={category.metadata_schemas}
        />
      );
    });
  }

  render() {
    const { category } = this.props;
    return (
      <div className="Category">
        <div className="Category-anchor" id={category.key} ref="anchor" />
        <div className="Category-section">
          <div className="Category-title-container"><Link to="#" className="Category-section-title">STYLE</Link></div>
          <div className="Category-sort-container"><Link to="#" className="Category-section-title">A-Z...</Link></div>
        </div>
        {size(category.tag_items) ? <div>{this.renderContent()}</div> : <TilePlaceholder />}
      </div>
    );
  }
}

Genres.propTypes = {
  likes: PropTypes.array,
  freshRecordIds: PropTypes.array,
  category: PropTypes.object.isRequired,
  metaData: PropTypes.object.isRequired,
};

Genres.defaultProps = {
  freshRecordIds: [],
  likes: [],
};

export default Genres;
