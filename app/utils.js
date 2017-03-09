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
