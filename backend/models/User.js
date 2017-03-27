import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { buildQuery } from '../config/db';

const insertQuery =
  'INSERT INTO users' +
    '(first_name, last_name, token, access_token, provider_id, profile_url, provider, gender, email)' +
    'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *';

export const createUser = params =>
  buildQuery(insertQuery, [
    params.name.givenName || '',
    params.name.familyName || '',
    generateToken(params.id),
    params.accessToken,
    params.id,
    params.profileUrl,
    params.provider,
    params.gender,
    params.emails[0].value,
  ]);

export const findById = id =>
  buildQuery(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );

export const findByProviderId = id =>
  buildQuery(
    'SELECT * FROM users WHERE provider_id = $1',
    [id]
  );

export const updateOauthToken = (id, token) =>
  buildQuery(
    'UPDATE users SET token = $2 WHERE id = $1',
    [id, token]
  );

const generateToken = id =>
  jwt.sign({ id }, crypto.randomBytes(256).toString('hex'), { expiresIn: '60d' });
