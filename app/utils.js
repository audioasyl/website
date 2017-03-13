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

export const colors = [
  '#93b02b',
  '#afd136',
  '#93af2d',
  '#596338',
  '#d4eb83',
  '#445115',
  '#5E701B',
  '#D3FC3E',
  '#9EBD2E',
  '#7E9625',
  '#FC4831',
  '#E3402C',
  '#3D110C',
  '#7D2318',
  '#BD3525',
  '#7D1E12',
  '#4A120B',
  '#C9665A',
  '#934A41',
  '#C9301D',
  '#4174BD',
  '#15263D',
  '#819EC8',
  '#27303D',
  '#2F558A',
  '#3C69C9',
  '#3155A3',
  '#12203D',
  '#3862BD',
  '#25417D',
  '#430463',
  '#893DB0',
  '#612B7D',
  '#7708B0',
  '#AB0BFC',
  '#A20AEF',
  '#7707AF',
  '#4C0570',
  '#320349',
  '#492363',
  '#C7B132',
  '#D4BD35',
  '#474012',
  '#877822',
  '#D4BD35',
  '#AD9B2B',
  '#877822',
  '#474012',
  '#D4BC35',
  '#AD9A2C',
  '#C7BA58',
];
