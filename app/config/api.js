const ENV = process ? process.env : {};

const hostname = ENV.HOST_NAME || 'localhost';
const port = ENV.PORT || '8000';

export const url = path => {
  console.log(hostname, port);
  return `http://${hostname}:${port}${path}`
};
