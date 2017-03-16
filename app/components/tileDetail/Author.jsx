import React, { PropTypes } from 'react';

import { metaDataItemsToProperties } from '../../parsers/metadataItems';
import Description from './Description';
import Timeline from './Timeline';
import Cover from './Cover';

import './Author.scss';
class Author extends React.Component {
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
          twitterUrl={authorProperties.twitter_url}
          facebookUrl={authorProperties.facebook_url}
        />
        <Cover />
        <Timeline
          channelId={authorProperties.channelID}
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
