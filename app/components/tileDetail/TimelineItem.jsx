import React, { PropTypes } from 'react';

import './TimelineItem.scss';
class TimelineItem extends React.Component {
  componentDidMount = () => {
    window.addEventListener('resize', this.updateState);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateState);
  }

  updateState = () => {
    this.setState({ offsetWidth: window.offsetWidth });
  }

  hideOverflowedItem = element => {
    if ((element.offsetTop + element.offsetHeight) <= element.parentElement.offsetHeight) {
      element.classList.add('TimelineItem--visible');
    } else {
      element.classList.remove('TimelineItem--visible');
    }
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
    if (this.props.item) {
      return (
        <div className="TimelineItem TimelineItem--visible">
          {this.renderTimelineItem()}
          <div className="TimelineItem-name">{this.props.item.name}</div>
          <div className="TimelineItem-desc">Lorem ipsum dolor sit amet</div>
        </div>
      );
    }

    return (
      <div>LOADING ...</div>
    );
  }
}

TimelineItem.propTypes = {
  item: PropTypes.object.isRequired,
  idx: PropTypes.isRequired,
};

export default TimelineItem;
