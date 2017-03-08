import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Search from './Search';
import HeaderDropdown from './HeaderDropdown';
import logo from '../../../public/images/logo.png';

import './MainHeader.scss';
const Header = ({ onFilterChange, searchContext }) => (
  <div className="Header">
    <div className="Header-fixed">
      <div className="Header-logo-wrapper">
        <img className="Header-logo" src={logo} alt="RadioKit" />
      </div>
      <div className="Header-left">
        {searchContext && <Search context={searchContext} limit={25} />}
        <div className="Header-nav">
          <HeaderDropdown
            onFilterChange={onFilterChange}
            className="Header-nav-item"
            options={artistsOptions}
            href="#artists-section"
            type="artists"
            label="Artist"
          />
          <HeaderDropdown
            onFilterChange={onFilterChange}
            className="Header-nav-item"
            options={albumsOptions}
            href="#albums-section"
            type="albums"
            label="Album"
          />
          <HeaderDropdown
            onFilterChange={onFilterChange}
            className="Header-nav-item"
            options={genresOptions}
            type="genres"
            label="Genres"
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
  searchContext: PropTypes.object.isRequired,
};

export default Header;
