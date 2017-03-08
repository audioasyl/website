import React, { PropTypes } from 'react';
import { remove } from 'lodash';
import Icon from './Icon';

import './LikeButton.scss';
export default class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: this.props.likes.indexOf(this.props.itemID) >= 0,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ isLiked: nextProps.likes.indexOf(this.props.itemID) >= 0 });
  }

  onLikeClick = e => {
    e.preventDefault()
    const likes = this.props.likes;

    if (likes.indexOf(this.props.itemID) < 0) {
      likes.push(this.props.itemID);
    } else {
      remove(likes, id => id === this.props.itemID);
    }

    this.setState({ isLiked: !this.state.isLiked });
    localStorage.setItem(this.props.storageKey, likes);
  }

  render () {
    const icon = this.state.isLiked ? 'heart' : 'heart-empty';

    return (
      <button className="LikeButton" onClick={e => this.onLikeClick(e)}>
        <Icon icon={icon} />
      </button>
    )
  }
}

LikeButton.propTypes = {
  storageKey: PropTypes.string.isRequired,
  itemID: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
}
