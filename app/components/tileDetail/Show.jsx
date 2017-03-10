import React, { PropTypes } from 'react';
import { map } from 'lodash';

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
    return (
      <div className="Show">
        <Description />
        <Cover />
        <Timeline renderTimelineItems={this.renderAlbums} />
      </div>
    );
  }
}

Show.propTypes = {

};

export default Show;
