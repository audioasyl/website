import { Scrollbars } from 'react-custom-scrollbars';
import React, { PropTypes } from 'react';

import './Timeline.scss';
class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      isLoading: false,
    };
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

  render() {
    return (
      <div className="Timeline">
        <Scrollbars
          style={{ height: '100%' }}
          onScrollFrame={this.handleScrollFrame}
        >
          {this.props.renderTimelineItems()}
          {this.state.isLoading && <div>LOADING ...</div>}
        </Scrollbars>
      </div>
    );
  }
}

Timeline.propTypes = {
  renderTimelineItems: PropTypes.func.isRequired,
  dataLazyLoader: PropTypes.func,
};

Timeline.defaultProps = {
  dataLazyLoader: () => {},
};

export default Timeline;
