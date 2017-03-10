import React, { PropTypes } from 'react';
import { map } from 'lodash';

import TimelineItem from './TimelineItem';
import Description from './Description';
import Timeline from './Timeline';

import './Author.scss';
class Author extends React.Component {
  renderAlbums = () =>
    map([], (item, idx) =>
      <TimelineItem key={item.id} item={item} idx={idx} />
    );

  render() {
    return (
      <div className="Author">
        <Description />
        <div className="Placeholder" />
        <Timeline renderTimelineItems={this.renderAlbums} />
      </div>
    );
  }
}

Author.propTypes = {
};

export default Author;
