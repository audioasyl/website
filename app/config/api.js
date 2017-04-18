const ENV = process ? process.env : {};

export const port = ENV.PORT || 8000;
export const hostname = ENV.HOST_NAME || 'localhost';

export const url = path => `http://${hostname}:${port}${path}`;
