import React from 'react';
import { Link } from 'react-router';

import Login from './Login';
import HeaderNav from './HeaderNav';
import LogoButton from './LogoButton';

import './MainHeader.scss';
const Header = () => (
  <div className="Header">
    <div className="Header-fixed">
      <LogoButton />
      <div className="Header-left">
        <HeaderNav>
          {/* <Link
            to="/#new"
            onClick={() => { window.retainScroll = false; }}
            className="Header-nav-item"
          >
            New
          </Link> */}
          <Link
            to="/#series"
            onClick={() => { window.retainScroll = false; }}
            className="Header-nav-item"
          >
            Show
          </Link>
          <Link
            to="/#genre"
            onClick={() => { window.retainScroll = false; }}
            className="Header-nav-item"
          >
            Genres
          </Link>
          <Link
            to="/#authors"
            onClick={() => { window.retainScroll = false; }}
            className="Header-nav-item"
          >
            Hosts
          </Link>
          <Link
            to="/#contact"
            onClick={() => { window.retainScroll = false; }}
            className="Header-nav-item"
          >
            Contact
          </Link>
          <Login />
        </HeaderNav>
      </div>
    </div>
  </div>
);

export default Header;
