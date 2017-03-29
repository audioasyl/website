import connectRedis from 'connect-redis';

const options = {
  host: '127.0.0.1' || process.env.REDIS_HOST,
  port: '6379' || process.env.REDI_PORT,
};

export default function (session) {
  const RedisStore = connectRedis(session);
  return new RedisStore(options);
}
