import React from 'react';
import { Link } from 'react-router';

import LogoButton from './LogoButton';

import './MainHeader.scss';
const Header = () => (
  <div className="Header">
    <div className="Header-fixed">
      <LogoButton />
      <div className="Header-left">
        <div className="Header-nav">
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
            to="/contact"
            onClick={() => { window.retainScroll = false; }}
            className="Header-nav-item"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
