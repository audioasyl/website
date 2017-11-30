import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { map, size, sortBy, lowerCase } from 'lodash';
import TilePlaceholder from '../TilePlaceholder';
import { metaDataItemsToProperties } from '../../parsers/metadataItems';
import ShowContent from './ShowContent';

import './Show.scss';
import './Categories.scss';

class Show extends React.Component {

  static propTypes = {
    likes: PropTypes.array,
    freshRecordIds: PropTypes.array,
    category: PropTypes.object.isRequired,
    metaData: PropTypes.object.isRequired,
    windowHeight: PropTypes.number.isRequired,
  };

  static defaultProps = {
    freshRecordIds: [],
    likes: [],
  };

  constructor(props) {
    super(props);
    this.audio = null;
    this.state = { openDetails: false };
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

  renderDetails() {
    const height = this.props.windowHeight - 240;
    if (this.state.openDetails) {
      return (
        <div className="Category-show-details">
          <div className="Category-show-details-inner" style={{ height }}>
            ALL <div className="Category-show-details-red">{this.audio.name}</div> ORDER BY DATE<br /><br />
            SOME CONTENT <br />
            SOME CONTENT <br />
            SOME CONTENT <br />
          </div>
        </div>
      );
    }
    return null;
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
        <ShowContent
          likes={likes}
          audio={tagItem}
          type={category.key}
          properties={itemProperties}
          key={tagItem.id}
          schema={category.metadata_schemas}
          onClick={this.onItemClick}
          isClicked={this.state.openDetails}
        />
      );
    });
  }

  render() {
    const { category } = this.props;
    return (
      <div className="Category">
        <div className="Category-anchor" id="show" ref="anchor" />
        <div className="Category-section">
          <div className="Category-title-container"><Link to="#" className="Category-section-title">SHOW&nbsp;</Link></div>
        </div>
        {
          size(category.tag_items) ?
            <div className="Category-show-container">
              <div style={{ flex: 1 }}>
                {this.renderContent()}
              </div>
              {this.renderDetails()}
            </div> :
            <TilePlaceholder />
        }
      </div>
    );
  }
}

export default Show;
