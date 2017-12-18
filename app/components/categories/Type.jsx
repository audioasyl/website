import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { map, size, sortBy, lowerCase } from 'lodash';
import ScrollableAnchor from 'react-scrollable-anchor';
import TilePlaceholder from '../TilePlaceholder';
import { metaDataItemsToProperties } from '../../parsers/metadataItems';
import TypeContent from './TypeContent';
import Search from '../header/Search';

import './Type.scss';
import './Categories.scss';

class Type extends React.Component {

  constructor(props) {
    super(props);
    this.audio = null;
    this.state = { openDetails: false };
  }

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
        <div className="Category-content-inner">
          <TypeContent
            likes={likes}
            audio={tagItem}
            type={category.key}
            properties={itemProperties}
            key={tagItem.id}
            schema={category.metadata_schemas}
            onClick={this.onItemClick}
            isClicked={this.state.openDetails}
          />
        </div>
      );
    });
  }

  onItemClick = audio => {
    if (this.state.openDetails === audio.id) {
      this.setState({ openDetails: false });
    } else if (!this.state.openDetails) {
      this.setState({ openDetails: audio.id });
      this.audio = audio;
    } else {
      this.setState({ openDetails: audio.id });
      this.audio = audio;
    }
  }

  render() {
    const { category } = this.props;
    return (
      <div className="Category">
        <ScrollableAnchor id={'type'}>
          <div className="Category-anchor" id="hosts" ref="anchor" />
        </ScrollableAnchor>
        <div className="Category-section">
          <div className="Category-section-left" />
          <div className="Category-section-right">
            <div className="Category-section-title Invisibility">SHOW</div>
            <div className="Category-section-title Invisibility">STYLE</div>
            <div className="Category-section-title">TYPE</div>
            <div className="Category-section-title Invisibility">ABOUT</div>
            <Search setSearchText="Search on page..." hidden />
          </div>
        </div>
        {size(category.tag_items) ? <div className="Category-content-container">
          {this.renderContent()}
        </div> : <TilePlaceholder />}
      </div>
    );
  }
}

Type.propTypes = {
  likes: PropTypes.array,
  freshRecordIds: PropTypes.array,
  category: PropTypes.object.isRequired,
  metaData: PropTypes.object.isRequired,
};

Type.defaultProps = {
  freshRecordIds: [],
  likes: [],
};

export default Type;
