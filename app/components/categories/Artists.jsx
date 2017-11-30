import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { map, size, sortBy, lowerCase } from 'lodash';
import TilePlaceholder from '../TilePlaceholder';
import { metaDataItemsToProperties } from '../../parsers/metadataItems';
import ArtistsContent from './ArtistsContent';

import './Artists.scss';
import './Categories.scss';

class Artists extends React.Component {

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
      //itemProperties.broadcast_channel_id = '15ffeff6-d946-4087-bc5c-ce9912ef222c'; // FIXME!!!!

      return (
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', wordWrap: 'break-word' }}>
          <ArtistsContent
            likes={likes}
            audio={tagItem}
            type={category.key}
            properties={itemProperties}
            key={tagItem.id}
            schema={category.metadata_schemas}
          />
        </div>
      );
    });
  }

  render() {
    const { category } = this.props;
    return (
      <div className="Category">
        <div className="Category-anchor" id="hosts" ref="anchor" />
        <div className="Category-section">
          <div className="Category-title-container"><Link to="#" className="Category-section-title">HOSTS</Link></div>
        </div>
        {size(category.tag_items) ? <div className="Category-artist-container">
          {this.renderContent()}
        </div> : <TilePlaceholder />}
      </div>
    );
  }
}

Artists.propTypes = {
  likes: PropTypes.array,
  freshRecordIds: PropTypes.array,
  category: PropTypes.object.isRequired,
  metaData: PropTypes.object.isRequired,
};

Artists.defaultProps = {
  freshRecordIds: [],
  likes: [],
};

export default Artists;
