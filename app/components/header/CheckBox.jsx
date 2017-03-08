import React, { PropTypes } from 'react';

import './CheckBox.scss';
export default class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = e => {
    this.setState({ checked: e.target.value });
    this.props.onChange(this.props.value);
  }

  render() {
    return (
      <div className="CheckBox">
        <label htmlFor="checkbox">
          <input
            type="checkbox"
            value={this.state.checked}
            onChange={this.onChange}
          />
          <span className="icon-check" />
          <div className="CheckBox-label">{this.props.label}</div>
        </label>
      </div>
    );
  }
}


CheckBox.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // option: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
