const ENV = process.env;

const hostname = ENV.HOST_NAME || 'localhost';
const port = ENV.PORT || '8000';

export const url = path => (
  ENV.NODE_ENV === 'production'
    ? `http://${hostname}${path}`
    : `http://${hostname}:${port}${path}`
);
