import url from 'url';
import pg from 'pg';

const ENV = process.env;

let config = {};

if (ENV.DATABASE_URL) {
  const params = url.parse(ENV.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true,
  };
} else {
  config = {
    user: ENV.AUDIOASYL_POSTGRES_USER || 'postgres',
    database: ENV.AUDIOASYL_DATABASE || 'audioasyl_dev',
    password: ENV.AUDIOASYL_DATABASE_PASSWORD || '',
    host: ENV.AUDIOASYL_DATABASE_HOST || '127.0.0.1',
    port: ENV.AUDIOASYL_DATABASE_PORT || '5432',
    max: ENV.AUDIOASYL_DATABASE_MAX || 10,
    idleTimeoutMillis: ENV.AUDIOASYL_DATABASE_TIMEOUT || 30000,
  };
}


export const pgPool = new pg.Pool(config);

export async function buildQuery(text, values) {
  try {
    const client = await pgPool.connect();
    try {
      const result = await client.query({ text, values });
      client.release();
      return result.rows;
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
