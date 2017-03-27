import { map, values, keys } from 'lodash';
import { buildQuery } from '../config/db';

const insertQuery =
  'INSERT INTO liked_tag_items (tag_id, user_id) VALUES($1, $2) returning *';

const deleteQuery =
  'DELETE FROM liked_tag_items WHERE TAG_ID = $1 AND user_id = $2 returning *';

const findByQuery = (attrs, op = 'AND') => {
  const whereCond = map(keys(attrs), (value, idx) => `${value} = $${idx + 1}`).join(op);
  return `SELECT * FROM liked_tag_items WHERE ${whereCond}`;
};

export const likeTagItem = (tagId, userId) => buildQuery(insertQuery, [tagId, userId]);

export const dislikeTagItem = (tagId, userId) => buildQuery(deleteQuery, [tagId, userId]);

export const findBy = attrs =>
  buildQuery(
    findByQuery(attrs),
    values(attrs)
  );
