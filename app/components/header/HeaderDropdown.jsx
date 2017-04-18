import React, { PropTypes } from 'react';
import { map, remove } from 'lodash';
import classNames from 'classnames';
import CheckBox from './CheckBox';

import './HeaderDropdown.scss';
export default class HeaderDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFilters: [],
    };
  }

  onFilterChange = value => {
    const filters = this.state.activeFilters;

    if (filters.indexOf(value) < 0) {
      filters.push(value);
    } else {
      remove(filters, filter => filter === value);
    }

    this.setState({ activeFilters: filters });

    this.props.onFilterChange({ [this.props.type]: filters });
  }

  renderOptions = () =>
    map(this.props.options, option => (
      <CheckBox
        key={option.label}
        label={option.label}
        value={option.value}
        onChange={this.onFilterChange}
      />
    ))

  render() {
    const contentClasses = classNames('HeaderDropdown-content');

    const labelClasses = classNames(
      'HeaderDropdown-label',
      this.props.className,
      { 'HeaderDropdown-label--filter-active': !!this.state.activeFilters.length }
    );

    return (
      <div className="HeaderDropdown">
        <a href={this.props.href} className={labelClasses} onClick={this.props.onClick}>
          {this.props.label}
        </a>
        <div
          className={contentClasses}
        >
          {/* this.renderOptions() */}
        </div>
      </div>
    );
  }
}

HeaderDropdown.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

HeaderDropdown.defaultProps = {
  onClick: () => {},
  className: '',
  href: '#',
};
