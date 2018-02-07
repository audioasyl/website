# AudioAsyl Website

Website of DJ collective AudioAsyl from Zurich.


# Prerequisites

You need Node.JS and Redis in order to launch the app.


# Running

## Development

* Start Redis server: `redis-server &`
* Install packages: `npm i`
* Start development server: `AUDIOASYL_FACEBOOK_APP_ID=805549022934393 AUDIOASYL_FACEBOOK_APP_SECRET=aaf802cb14d9674f14e1bd46320ebfd6 AUDIOASYL_FACEBOOK_CALLBACK=http://localhost:8888 AUDIOASYL_LOG_TYPE=common REDIS_URL=redis://localhost:6379/1 HOST_NAME='"localhost:8888"' npm run dev`
* Once build is ready the application should be available at http://localhost:8888


## Production

* Start Redis server: `redis-server &`
* Install packages: `npm i`
* Build the frontend: `NODE_ENV=production npm run build`
* Build the backend: `NODE_ENV=production npm run build-backend`
* Run: `NODE_ENV=production AUDIOASYL_FACEBOOK_APP_ID=805549022934393 AUDIOASYL_FACEBOOK_APP_SECRET=aaf802cb14d9674f14e1bd46320ebfd6 AUDIOASYL_FACEBOOK_CALLBACK=http://localhost:8000 AUDIOASYL_LOG_TYPE=common REDIS_URL=redis://localhost:6379/1 HOST_NAME='"localhost:8888"' node server.build.js`
* The application should be available at http://localhost:8000 

FIXME that crashes with

```
Error: only absolute urls are supported
```

# Authors

* Konrad Marzec
* Daniel Bulanda
