import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../Icon';

import './HeaderNav.scss';
class HeaderNav extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  addCallbackToChildren = () =>
    React.Children.map(this.props.children,
     child => React.cloneElement(child, {
       onClick: () => this.setState({ active: !this.state.active }),
     })
    );

  render() {
    const headerNavClasses = classNames(
      'HeaderNav',
      { 'HeaderNav--active': !!this.state.active }
    );

    return (
      <div className={headerNavClasses}>
        <button
          className="HeaderNav-hamburger"
          onClick={() => this.setState({ active: !this.state.active })}
        >
          <Icon icon="menu" />
        </button>
        <div className="HeaderNav-items">
          {this.addCallbackToChildren()}
        </div>
      </div>
    );
  }
}

HeaderNav.propTypes = {
  children: PropTypes.array.isRequired,
};

export default HeaderNav;
