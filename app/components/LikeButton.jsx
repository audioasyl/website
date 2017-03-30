import React, { PropTypes } from 'react';
import Icon from './Icon';

import './LikeButton.scss';
class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: this.props.likes.indexOf(this.props.itemID) >= 0,
    };
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ isLiked: nextProps.likes.indexOf(this.props.itemID) >= 0 });
  }

  onLikeClick = e => {
    e.preventDefault();
    if (this.state.isLiked) {
      fetch(`/dislike/${this.props.itemID}`, { method: 'DELETE', credentials: 'same-origin' })
        .then(res => {
          if (res.ok) {
            this.setState({ isLiked: false });
          } else {
            this.setState({ error: res });
            this.hideErrorMesg();
          }
        })
        .catch(err => console.error(err));
    } else {
      fetch('/like', {
        body: JSON.stringify({ tagId: this.props.itemID }),
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => {
        if (res.ok) {
          this.setState({ isLiked: true });
        } else {
          this.setState({ error: res });
          this.hideErrorMesg();
        }
      })
      .catch(err => {
        this.setState({ error: err });
        this.hideErrorMesg();
      });
    }
  }

  hideErrorMesg = () =>
    setTimeout(() => this.setState({ error: null }), 4500);

  renderToolTip = () => (
    <div className="LikeButton-error">
      <div className="LikeButton-error-mesg">Please Log In to use this feature.</div>
      <a onClick={e => e.preventDefault()} href="/auth/facebook">LOG IN</a>
    </div>
  );

  render() {
    const icon = this.state.isLiked ? 'heart' : 'heart-empty';

    return (
      <div>
        {this.state.error && this.renderToolTip()}
        <button className="LikeButton" onClick={e => this.onLikeClick(e)}>
          {this.state.errors}
          <Icon icon={icon} />
        </button>
      </div>
    );
  }
}

LikeButton.propTypes = {
  itemID: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
};

export default LikeButton;
