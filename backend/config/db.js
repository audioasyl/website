import pg from 'pg';

const ENV = process.env;

const config = {
  user: ENV.AUDIOASYL_POSTGRES_USER || 'postgres',
  database: ENV.AUDIOASYL_DATABASE || 'audioasyl_dev',
  password: ENV.AUDIOASYL_DATABASE_PASSWORD || '',
  host: ENV.AUDIOASYL_DATABASE_HOST || 'localhost',
  port: ENV.AUDIOASYL_DATABASE_PORT || 5432,
  max: ENV.AUDIOASYL_DATABASE_MAX || 10,
  idleTimeoutMillis: ENV.AUDIOASYL_DATABASE_TIMEOUT || 30000,
};

export const pgPool = new pg.Pool(config);
