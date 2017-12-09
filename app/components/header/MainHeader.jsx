import React, { PropTypes } from 'react';
// import { Link } from 'react-router';

// import Login from './Login';
import Search from './Search';

import HeaderNav from './HeaderNav';
import LogoButton from './LogoButton';
import HeaderDropdown from './HeaderDropdown';

import './MainHeader.scss';
const Header = ({ onFilterChange, setSearchText }) => (
  <div className="Header">
    <div className="Header-fixed">
      <div className="Header-left">
        <LogoButton />
      </div>
      <div className="Header-right">
        {/* <HeaderNav> */}
          <HeaderDropdown
            onFilterChange={onFilterChange}
            options={genresOptions}
            label="Show"
            href="#show"
            type="show"
          />
          <HeaderDropdown
            onFilterChange={onFilterChange}
            options={albumsOptions}
            href="#style"
            label="Style"
            type="style"
          />
          <HeaderDropdown
            onFilterChange={onFilterChange}
            options={albumsOptions}
            href="#type"
            label="Type"
            type="type"
          />
          <HeaderDropdown
            onFilterChange={onFilterChange}
            options={artistsOptions}
            href="#about"
            type="about"
            label="About"
          />
          <Search setSearchText={setSearchText} />
          {/* <Login /> */}
        {/* </HeaderNav> */}
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
