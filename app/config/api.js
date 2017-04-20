const ENV = process.env;

const hostname = ENV.HOST_NAME || 'localhost';

export const url = path => `http://${hostname}${path}`;
