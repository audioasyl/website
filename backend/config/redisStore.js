import connectRedis from 'connect-redis';

const options = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || '6379',
};

export default function (session) {
  const RedisStore = connectRedis(session);
  return new RedisStore(options);
}
