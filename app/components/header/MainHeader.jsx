import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Search from './Search';
import HeaderDropdown from './HeaderDropdown';
import logo from '../../../public/images/logo.png';

import './MainHeader.scss';
const Header = ({ onFilterChange, setSearchText }) => (
  <div className="Header">
    <div className="Header-fixed">
      <div className="Header-logo-wrapper">
        <img className="Header-logo" src={logo} alt="RadioKit" />
      </div>
      <div className="Header-left">
        <Search setSearchText={setSearchText} />
        <div className="Header-nav">
          <HeaderDropdown
            onFilterChange={onFilterChange}
            className="Header-nav-item"
            options={artistsOptions}
            href="#series"
            type="series"
            label="Show"
          />
          <HeaderDropdown
            onFilterChange={onFilterChange}
            className="Header-nav-item"
            options={genresOptions}
            label="Genres"
            href="#genre"
            type="genre"
          />
          <HeaderDropdown
            onFilterChange={onFilterChange}
            className="Header-nav-item"
            options={albumsOptions}
            href="#authors"
            label="Hosts"
            type="hosts"
          />
          <Link to="/contact" className="Header-nav-item" activeClassName="Header-nav-item--active">
            Contact
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const artistsOptions = [
  { label: 'Live', value: 'live' },
  { label: 'Curated', value: 'curated' },
  { label: 'Play Lists', value: 'playLists' },
];

const albumsOptions = [
  { label: 'Live', value: 'live' },
  { label: 'Curated', value: 'curated' },
  { label: 'Play Lists', value: 'playLists' },
];

const genresOptions = [
  { label: 'DJ`s', value: 'dj' },
  { label: 'Channel Editors', value: 'editors' },
  { label: 'Clubs', value: 'clubs' },
  { label: 'Festivals', value: 'festivals' },
];

Header.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  setSearchText: PropTypes.object.isRequired,
};

export default Header;
