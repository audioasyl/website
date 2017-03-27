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
          <Link to="/#series" className="Header-nav-item">
            Show
          </Link>
          <Link to="/#genre" className="Header-nav-item">
            Genres
          </Link>
          <Link to="/#authors" className="Header-nav-item">
            Authors
          </Link>
          <Link to="/contact" className="Header-nav-item">
            Contact
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
