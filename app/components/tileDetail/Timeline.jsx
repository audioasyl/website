import { Scrollbars } from 'react-custom-scrollbars';
import { Channel } from 'radiokit-toolkit-playback';
import React, { PropTypes } from 'react';
import { map } from 'lodash';

import TimelineItem from './TimelineItem';

import './Timeline.scss';
class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      isLoading: false,
    };
  }

  componentWillMount = () => {
    const player = new Channel.Player(this.props.channelId, 'demo');
  }

  handleScrollFrame = ({ scrollTop, scrollHeight, clientHeight }) => {
    if (this.props.dataLazyLoader
      && scrollTop + 50 > scrollHeight - clientHeight
      && !this.state.isLoading
      && this.state.scrollTop < scrollTop
    ) {
      this.setState({ isLoading: true });
      this.props.dataLazyLoader()
        .then(() => {
          this.setState({ isLoading: false });
        });
    }

    this.setState({ scrollTop });
  }

  playTrack = id => {

  }

  renderTimelineItems = () =>
    map([{ name: 'Name', metadata_items: {} }, { name: 'Name', metadata_items: {} }], t =>
      <TimelineItem
        onClick={this.playTrack}
        item={t}
      />
    );

  render() {
    return (
      <div className="Timeline">
        <Scrollbars
          style={{ height: '100%' }}
          onScrollFrame={this.handleScrollFrame}
        >
          {this.renderTimelineItems()}
          {this.state.isLoading && <div>LOADING ...</div>}
        </Scrollbars>
      </div>
    );
  }
}

Timeline.propTypes = {
  channelId: PropTypes.string.isRequired,
  dataLazyLoader: PropTypes.func,
};

Timeline.defaultProps = {
  dataLazyLoader: () => {},
};

export default Timeline;
