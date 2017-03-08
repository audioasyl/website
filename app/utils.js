import { split } from 'lodash';

export const getLikes = key =>
  split((localStorage.getItem(key) || ''), ',');
