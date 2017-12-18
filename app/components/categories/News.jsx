import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { map, size, sortBy, lowerCase } from 'lodash';
import { Timeline } from 'react-twitter-widgets';
import TilePlaceholder from '../TilePlaceholder';
import { metaDataItemsToProperties } from '../../parsers/metadataItems';
import NewsContent from './NewsContent';

import './News.scss';
import './Categories.scss';

class News extends React.Component {

  renderContent = () => {
    let counter = 1;
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
      if (counter <= 4) {
        counter += 1;
        return (
          <NewsContent
            likes={likes}
            audio={tagItem}
            type={category.key}
            properties={itemProperties}
            key={tagItem.id}
            schema={category.metadata_schemas}
          />
        );
      }
      return false;
    });
  }

  render() {
    const { category } = this.props;
    return (
      <div className="Category" style={{ marginTop: '7rem' }}>
        <div className="Category-anchor" id="news" ref="anchor" />
        <div className="Twitter-container">
          <div className="Twitter-container-inner">
            <Timeline
              dataSource={{ sourceType: 'profile', screenName: 'audioasyl' }}
              options={{
                username: 'audioasyl',
                chrome: 'nofooter noheader transparent noborders',
                tweetLimit: 1,
              }}
              onLoad={() => console.log('Timeline is loaded!')}
            />
          </div>
        </div>
        {size(category.tag_items) ? <div>{this.renderContent()}</div> : <TilePlaceholder />}
      </div>
    );
  }
}

News.propTypes = {
  likes: PropTypes.array,
  freshRecordIds: PropTypes.array,
  category: PropTypes.object.isRequired,
  metaData: PropTypes.object.isRequired,
};

News.defaultProps = {
  freshRecordIds: [],
  likes: [],
};

export default News;
