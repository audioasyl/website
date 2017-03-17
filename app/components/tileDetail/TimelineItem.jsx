import React, { PropTypes } from 'react';

import ContentLoader from '../ContentLoader';

import './TimelineItem.scss';
class TimelineItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentWillMount = () => this.fetchTrackInfo(this.props.item);

  componentWillReceiveProps = nextProps => this.fetchTrackInfo(nextProps.item);

  fetchTrackInfo = item => {
    this.setState({ isLoading: true });
    item.getInfoAsync()
      .then(trackInfo => {
        this.setState({ track: trackInfo, isLoading: false });
      })
      .catch(err =>
        console.log(err)
      );
  }

  renderArchiveItem = () => (
    <div className="TimelineItem-header">archive</div>
  )

  renderCurrentItem = () => (
    <div className="TimelineItem-header">Current show</div>
  )

  renderNextItem = () => (
    <div className="TimelineItem-header">next show</div>
  )

  renderTimelineItem = () => {
    switch (this.props.idx) {
    case 0:
      return this.renderNextItem();
    case 1:
      return this.renderCurrentItem();
    default:
      return this.renderArchiveItem();
    }
  }

  render() {
    if (this.state.isLoading && !this.state.track) {
      return (
        <div className="TimelineItem TimelineItem-placeholder">
          <ContentLoader />
        </div>
      );
    }
    const trackData = this.state.track.getMetadata();

    return (
      <button
        onClick={this.props.onClick}
        disabled={!this.props.onClick}
        className="TimelineItem TimelineItem--visible"
      >
        {/* this.renderTimelineItem() */}
        <div className="TimelineItem-name">{trackData.title}</div>
        <div className="TimelineItem-desc">{trackData.album}</div>
      </button>
    );
  }
}

TimelineItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  idx: PropTypes.string,
};

TimelineItem.defaultProps = {
  onClick: null,
  idx: '',
};

export default TimelineItem;
