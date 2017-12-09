import React, { PropTypes } from 'react';

import Icon from '../Icon';

import './Search.scss';
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchText: '' };
  }

  onSearchClick = e => {
    e.preventDefault();
    this.props.setSearchText(this.state.searchText);
  }

  onChange = e => {
    e.preventDefault();
    this.setState({ searchText: e.target.value });
    this.props.setSearchText(e.target.value);
  }

  render() {
    const visibility = this.props.hidden ? 'hidden' : 'visible';
    return (
      <div className="Search" style={{ visibility }}>
        <form onSubmit={e => this.onSearchClick(e)}>
          <input
            type="text"
            value={this.state.searchText}
            placeholder="Search on page..."
            onChange={e => this.onChange(e)}
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
  setSearchText: PropTypes.func.isRequired,
  hidden: PropTypes.bool,
};

Search.defaultProps = {
  hidden: false,
};

export default Search;
