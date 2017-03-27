import { Scrollbars } from 'react-custom-scrollbars';
import { Channel } from 'radiokit-toolkit-playback';
import React, { PropTypes } from 'react';
import { map } from 'lodash';

import TimelineItem from './TimelineItem';
import ContentLoader from '../ContentLoader';

import './Timeline.scss';
class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      track: [],
      scrollTop: 0,
      isLoading: false,
    };
  }

  componentWillMount = () => {
    const playerOptions = { from: 20 * 60, to: 10 * 60 }
    const player = new Channel.Player(this.props.channelID, 'demo', playerOptions);
    this.setState({ isLoading: true });
    player.fetchPlaylist();
    player.on('playlist-fetched', track =>
      this.setState({ track: track.getTracks(), isLoading: false }));
    this.setState({ player });
  }

  componentWillUnmount = () => {
    this.state.player.stop();
    this.state.player.stopFetching();
  }

  renderTimelineItems = () =>
    map(this.state.track, (set, id) =>
      <TimelineItem
        key={id}
        item={set}
      />
    );

  render() {
    if (this.state.isLoading) {
      return (
        <div className="Timeline Timeline-placeholder">
          <ContentLoader />
        </div>
      );
    }

    return (
      <div className="Timeline">
        <Scrollbars
          style={{ height: '100%' }}
          onScrollFrame={this.handleScrollFrame}
        >
          {this.renderTimelineItems()}
        </Scrollbars>
      </div>
    );
  }
}

Timeline.propTypes = {
  channelID: PropTypes.string.isRequired,
};

Timeline.defaultProps = {
  dataLazyLoader: () => {},
};

export default Timeline;
