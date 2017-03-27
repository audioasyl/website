import { split } from 'lodash';

export const getLikes = key =>
  split((localStorage.getItem(key) || ''), ',');

export const play = (e, artistID, context) => {
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
