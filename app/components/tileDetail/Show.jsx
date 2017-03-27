import React, { PropTypes } from 'react';
import { map } from 'lodash';

import { metaDataItemsToProperties } from '../../parsers/metadataItems';
import TimelineItem from './TimelineItem';
import Description from './Description';
import Timeline from './Timeline';
import Cover from './Cover';

import './Show.scss';
class Show extends React.Component {
  renderAlbums = () =>
    map([], (item, idx) =>
      <TimelineItem key={item.id} item={item} idx={idx} />
    );


  render() {
    const { show, category, likes } = this.props;
    const showProperties =
      metaDataItemsToProperties(show.metadata_items, category.metadata_schemas);

    return (
      <div className="Show">
        <Description
          likes={likes}
          audioID={show.id}
          header={show.name}
          about={showProperties.about}
        />
        <Cover
          title={show.name}
          audioID={show.id}
          cover={showProperties.cover}
          description={showProperties.series_lead}
        />
        <Timeline
          channelID={showProperties.broadcast_channel_id}
        />
      </div>
    );
  }
}

Show.propTypes = {
  category: PropTypes.object.isRequired,
  show: PropTypes.object.isRequired,
  likes: PropTypes.array,
};

Show.defaultProps = {
  likes: [],
  show: { metadata_items: [] },
  category: { metadata_schemas: {} },
};

export default Show;
