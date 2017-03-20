import React, { PropTypes } from 'react';

import { metaDataItemsToProperties } from '../../parsers/metadataItems';
import Description from './Description';
import Timeline from './Timeline';
import Cover from './Cover';

import './Genre.scss';
const Genre = ({ genre, category }) => {
  const genreProperties =
    metaDataItemsToProperties(genre.metadata_items, category.metadata_schemas);

  return (
    <div className="Genre">
      <Description
        audioID={genre.id}
        header={genre.name}
        about={genreProperties.about}
        contributors={contributors(genreProperties.contributors)}
      />
      <Cover
        title={genre.name}
        audioID={genre.id}
        cover={genreProperties.cover}
        description={genreProperties.series_lead}
      />
      <Timeline
        channelID={genreProperties.broadcast_channel_id}
      />
    </div>
  );
};

const contributors = contributorsStr => (contributorsStr ? contributorsStr.split(',') : []);

Genre.propTypes = {
  genre: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
};

export default Genre;
