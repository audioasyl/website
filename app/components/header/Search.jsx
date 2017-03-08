import React, { PropTypes } from 'react';
import { join, keysIn } from 'lodash';

import Icon from '../Icon';

import './Search.scss';
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchText: '' };
  }

  onSearchClick = e => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="Search">
        <form onSubmit={e => this.onSearchClick(e)}>
          <input
            type="text"
            value={this.state.searchText}
            placeholder={`Search ${join(keysIn(this.props.context), ', ')}...`}
            onChange={e => this.setState({ searchText: e.target.value })}
          />

          <button className="Search-button" type="submit">
            <Icon icon="search" />
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  context: PropTypes.object.isRequired,
};

export default Search;
