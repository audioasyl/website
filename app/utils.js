import moment from 'moment';
import { find, sortBy, filter } from 'lodash';

export const getLikes = () =>
  fetch('/likes', { credentials: 'same-origin' })
    .then(response => response.json());

export const play = (e, artistID, channelID, context) => {
  e.preventDefault();

  const { router, location } = context;
  const { play: status, id } = location.query;

  let playStatus;

  if (id !== artistID) {
    playStatus = 'play';
  } else {
    playStatus = status === 'play' ? 'pause' : 'play';
  }

  router.replace({
    pathname: location.pathname,
    query: {
      ...location.query,
      channel_id: channelID,
      play: playStatus,
      id: artistID,
    },
  });
};

export const tileColors = {
  series: '#93b02b',
  genre: '#78a3ff',
  authors: '#ff7261',
};

export const saveScrollPosition = () => {
  window.retainScroll = true;
  localStorage.setItem('scrollTop', window.scrollY);
};

export const restoreScrollPosition = () =>
  localStorage.getItem('scrollTop');

export const getAuthToken = () => {
  fetch('/auth_token', { credentials: 'same-origin' })
    .then(response => response.json())
    .then(({ token }) => (token && localStorage.setItem('token', token)))
    .catch(localStorage.removeItem('token'));
};

export const getCurrentSet = playlist =>
  find(playlist.getTracks(), track => isCurrentlyPlaying(track)
);

export const isCurrentlyPlaying = track =>
  moment(track.getFadeInAt()).isSameOrBefore(moment())
    && moment(track.getFadeOutAt()).isAfter(moment());

export const getNextSong = playlist => {
  const now = moment();
  return sortBy(filter(playlist, song => now.isBefore(moment(song.getFadeInAt()))), song =>
    song.getFadeInAt()
  )[0];
};
