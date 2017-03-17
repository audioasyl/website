import React, { PropTypes } from 'react';

import { metaDataItemsToProperties } from '../../parsers/metadataItems';
import Description from './Description';
import Timeline from './Timeline';
import Cover from './Cover';

import './Author.scss';
const Author = ({ author, category }) => {
  const authorProperties =
    metaDataItemsToProperties(author.metadata_items, category.metadata_schemas);

  return (
    <div className="Author">
      <Description
        header={author.name}
        about={authorProperties.about}
      />
      <Cover
        title={author.name}
        audioID={author.id}
        cover={authorProperties.cover}
        description={authorProperties.series_lead}
      />
      <Timeline
        channelID={authorProperties.broadcast_channel_id}
      />
    </div>
  );
};

Author.propTypes = {
  author: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
};

export default Author;
