import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { pgPool } from '../config/db';

const insertQuery =
  'INSERT INTO users' +
    '(first_name, last_name, token, access_token, provider_id, profile_url, provider, gender, email)' +
    'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id';

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

export async function buildQuery(text, values) {
  try {
    const client = await pgPool.connect();
    try {
      const result = await client.query({ text, values });
      client.release();
      return result.rows[0];
    } catch (err) {
      console.error('error running query', err);
      client.release();
      throw err;
    }
  } catch (err) {
    console.error('error fetching client from pgPool', err);
    throw err;
  }
}

const generateToken = id =>
  jwt.sign({ id }, crypto.randomBytes(256).toString('hex'), { expiresIn: '60d' });
