import React, { PropTypes } from 'react';
import { map } from 'lodash';

import { metaDataItemsToProperties } from '../../parsers/metadataItems';
import TimelineItem from './TimelineItem';
import Description from './Description';
import Timeline from './Timeline';

import './Author.scss';
class Author extends React.Component {
  renderAlbums = () =>
    map(this.state.track, (item, idx) =>
      <TimelineItem
        key={item.id}
        item={item}
        idx={idx}
      />
    );

  render() {
    const { author, category } = this.props;
    const authorProperties =
      metaDataItemsToProperties(author.metadata_items, category.metadata_schemas);

    authorProperties.channelID = 'fd9a7d1c-a387-40a0-b876-2799668d6f9d';

    return (
      <div className="Author">
        <Description
          header={author.name}
          about={authorProperties.about}
        />
        <div className="Placeholder" />
        <Timeline
          renderTimelineItems={this.renderAlbums}
          channelId={authorProperties.channelId}
        />
      </div>
    );
  }
}

Author.propTypes = {
  category: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
};

Author.defaultProps = {
  author: { metadata_items: [] },
  category: { metadata_schemas: {} },
};

export default Author;
