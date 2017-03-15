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
    const { show, category } = this.props;
    const showProperties =
      metaDataItemsToProperties(show.metadata_items, category.metadata_schemas);

    showProperties.channelID = 'fd9a7d1c-a387-40a0-b876-2799668d6f9d';
    return (
      <div className="Show">
        <Description
          header={show.name}
          about={showProperties.about}
        />
        <Cover />
        <Timeline
          renderTimelineItems={this.renderAlbums}
          channelID={showProperties.channelID}
        />
      </div>
    );
  }
}

Show.propTypes = {
  category: PropTypes.object.isRequired,
  show: PropTypes.object.isRequired,
};

Show.defaultProps = {
  show: { metadata_items: [] },
  category: { metadata_schemas: {} },
};

export default Show;
