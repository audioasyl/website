import React, { PropTypes } from 'react';

import { metaDataItemsToProperties } from '../../parsers/metadataItems';
import Description from './Description';
import Headers from '../../Headers';
import Timeline from './Timeline';
import Cover from './Cover';

import './Author.scss';
const Author = ({ author, category, likes }) => {
  const authorProperties =
    metaDataItemsToProperties(author.metadata_items, category.metadata_schemas);

  return (
    <div className="Author">
      <Headers
        title={author.name}
        ogTitle={author.name}
        ogImage={authorProperties.cover}
      />
      <Description
        likes={likes}
        audioID={author.id}
        header={author.name}
        about={authorProperties.about}
      />
      <Cover
        title={author.name}
        audioID={author.id}
        cover={authorProperties.cover}
        description={authorProperties.series_lead}
        channelID={authorProperties.broadcast_channel_id}
      />
      <Timeline
        channelID={authorProperties.broadcast_channel_id}
      />
    </div>
  );
};

Author.propTypes = {
  likes: PropTypes.array,
  author: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
};

Author.defaultProps = {
  likes: [],
};

export default Author;
