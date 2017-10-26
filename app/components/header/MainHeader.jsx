import React, { PropTypes } from 'react';
// import { Link } from 'react-router';

// import Login from './Login';
// import Search from './Search';
import HeaderNav from './HeaderNav';
import LogoButton from './LogoButton';
import HeaderDropdown from './HeaderDropdown';

import './MainHeader.scss';
const Header = ({ onFilterChange, setSearchText }) => (
  <div className="Header">
    <div className="Header-fixed">
      <LogoButton />
      <div className="Header-left">
        <HeaderNav>
          <HeaderDropdown
            onFilterChange={onFilterChange}
            className="Header-nav-item"
            options={artistsOptions}
            href="#news"
            type="news"
            label="News"
          />
          <HeaderDropdown
            onFilterChange={onFilterChange}
            className="Header-nav-item"
            options={genresOptions}
            label="Show"
            href="#show"
            type="show"
          />
          <HeaderDropdown
            onFilterChange={onFilterChange}
            className="Header-nav-item"
            options={albumsOptions}
            href="#hosts"
            label="Hosts"
            type="hosts"
          />
          <HeaderDropdown
            onFilterChange={onFilterChange}
            className="Header-nav-item"
            options={albumsOptions}
            href="#style"
            label="Style"
            type="style"
          />
          {/* <Login /> */}
        </HeaderNav>
        {/* <Search setSearchText={setSearchText} /> */}
      </div>
    </div>
  </div>
);

// const newOptions = [
//
// ];

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
  onFilterChange: PropTypes.func,
  setSearchText: PropTypes.func,
};

Header.defaultProps = {
  onFilterChange: () => {},
  setSearchText: () => {},
};


export default Header;
