import React, { PropTypes } from 'react';
// import { Link } from 'react-router';


import './Footer.scss';
const Footer = ({ onFilterChange, setSearchText }) => (
  <div className="Footer">
    &nbsp;Welcome my friends! Welcome my friends! Welcome my friends! Welcome my friends!
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

Footer.propTypes = {
  onFilterChange: PropTypes.func,
  setSearchText: PropTypes.func,
};

Footer.defaultProps = {
  onFilterChange: () => {},
  setSearchText: () => {},
};


export default Footer;
