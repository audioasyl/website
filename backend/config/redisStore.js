import connectRedis from 'connect-redis';

const options = {
  url: process.env.REDIS_URL || 'redis://localhost:6379/0',
};

export default function (session) {
  const RedisStore = connectRedis(session);
  return new RedisStore(options);
}
