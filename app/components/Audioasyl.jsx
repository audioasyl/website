import { Link } from 'react-router';
import { map, split } from 'lodash';
import React, { PropTypes } from 'react';
import Masonry from 'react-masonry-component';

import AudioTile from './AudioTile';
import MainHeader from './header/MainHeader';
import {
  getLikes,
} from '../utils';

import './Audioasyl.scss';
class Audioasyl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchContext: {
        artist: artists => this.setState({ artists }),
        album: albums => this.setState({ albums }),
      },
      artists: {},
      albums: {},
      play: {},
    };
  }

  getChildContext = () => ({
    router: this.props.router,
    location: this.props.location,
  });

  componentWillMount = () => {
    this.loadData(this.props);
  }

  buildSearchContext = () => {

  }

  loadData = () => {
    this.setState({ artistIsLoading: true, albumIsLoading: true });
  }

  renderArtists = () => {
    const likes = split((localStorage.getItem('artists_likes') || ''), ',');

    return map(this.state.artists.items, artist => (
      <AudioTile
        type="artists"
        likes={likes}
        audio={artist}
        key={artist.id}
        isLive={artist.popularity > 88}
        isFresh={artist.popularity < 50}
        isSpecial={artist.followers && artist.followers.total > 3000000}
      />
    ));
  }

  renderAlbums = () => {
    const likes = getLikes('albums_likes');

    return map(this.state.albums.items, album => (
      <AudioTile
        audio={album}
        type="albums"
        likes={likes}
        key={album.id}
        isSpecial={false}
        isLive={album.available_markets.length > 60}
        isFresh={album.available_markets.length < 3}
      />
    ));
  }

  render() {
    const masonryOptions = {
      percentPosition: true,
      columnWidth: '.grid-sizer',
      itemSelector: '.AudioTile',
    };

    return (
      <div className="Audioasyl">
        <MainHeader
          searchContext={this.state.searchContext}
          onFilterChange={this.buildSearchContext}
        />
        <div className="Audioasyl-section" id="artists-section">
          <Link to="/artists" className="Audioasyl-section-title">Artists</Link>
        </div>
        <Masonry
          options={masonryOptions}
          className="Audioasyl-tiles"
        >
          <div className="grid-sizer" />
          {this.renderArtists()}
        </Masonry>
        <div className="Audioasyl-section" id="albums-section">
          <Link to="/albums" className="Audioasyl-section-title">Albums</Link>
        </div>
        <Masonry
          options={masonryOptions}
          className="Audioasyl-tiles"
        >
          <div className="grid-sizer" />
          {this.renderAlbums()}
        </Masonry>
      </div>
    );
  }
}

Audioasyl.childContextTypes = {
  router: PropTypes.object,
  location: PropTypes.object,
};

Audioasyl.propTypes = {
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Audioasyl;
