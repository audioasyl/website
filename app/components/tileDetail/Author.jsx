import React, { PropTypes } from 'react';
import { map } from 'lodash';

import { recordFilesForTagItems } from '../../queries/recordItem';
import { recordFileToMap } from '../../parsers/recordFile';
import TimelineItem from './TimelineItem';
import Description from './Description';
import Timeline from './Timeline';

import './Author.scss';
class Author extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      track: [],
    };
  }

  componentDidMount = () => {
    this.fetchData();
  }

  fetchData = () => {
    recordFilesForTagItems(this.context.router.params.id)
      .offset(this.state.offset).limit(LIMIT)
      .fetch()
      .on('fetch', (_, __, data) => {
        this.setState({
          track: {
            ...this.state.track,
            ...recordFileToMap(data.toJS()),
          },
          offset: this.state.offset + LIMIT,
        });
      })
      .on('error', (_, __, err) => {
        console.log('error', err);
      });

    return new Promise(resolve => resolve());
  }

  renderAlbums = () =>
    map(this.state.track, (item, idx) =>
      <TimelineItem
        dataLazyLoader={this.fetchData}
        key={item.id}
        item={item}
        idx={idx}
      />
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
const LIMIT = 20;

Author.propTypes = {
};

Author.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default Author;
