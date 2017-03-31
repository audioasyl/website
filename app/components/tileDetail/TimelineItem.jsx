import React, { PropTypes } from 'react';
import classNames from 'classnames';

import ContentLoader from '../ContentLoader';
import { isCurrentlyPlaying } from '../../utils';

import './TimelineItem.scss';
class TimelineItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      isLoading: false,
    };
  }

  componentWillMount = () => this.fetchTrackInfo(this.props.item);

  componentWillReceiveProps = nextProps => this.fetchTrackInfo(nextProps.item);

  fetchTrackInfo = item => {
    this.setState({ isLoading: true, isPlaying: isCurrentlyPlaying(item) });
    item.getInfoAsync()
      .then(trackInfo => {
        this.setState({ track: trackInfo, isLoading: false });
      })
      .catch(err =>
        console.log(err)
      );
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
    const trackItemClasses = classNames(
      'TimelineItem TimelineItem--visible', {
        'TimelineItem--current': this.state.isPlaying,
        'TimelineItem--next': this.props.item.getId() === this.props.nextSetId,
      }
    );

    return (
      <button
        onClick={this.props.onClick}
        disabled={!this.props.onClick}
        className={trackItemClasses}
      >
        <div className="TimelineItem-name">{trackData.title}</div>
        <div className="TimelineItem-desc">{trackData.album}</div>
      </button>
    );
  }
}

TimelineItem.propTypes = {
  item: PropTypes.object.isRequired,
  nextSetId: PropTypes.string,
  onClick: PropTypes.func,
};

TimelineItem.defaultProps = {
  onClick: () => {},
  nextSetId: '',
};

export default TimelineItem;
