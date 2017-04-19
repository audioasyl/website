import { find } from 'lodash';
let resolveCallback = () => {};

const requests = {};
let state = typeof state === 'undefined' && {};

const setState = data => {
  state = {
    ...state,
    ...data,
  };
};

const errHandler = err => console.log('error', err); // eslint-disable-line

const checkState = key => state[key] && !state[key].err;

const pending = () =>
  !!find(requests, req => req);

export const resolveAll = () =>
  new Promise(resolve => {
    if (pending()) {
      resolveCallback = resolve;
    } else {
      resolve();
    }
  });

export default (request, success, error = errHandler) => {
  if (checkState(request.getCollectionUrl())) {
    return success(state[request.getCollectionUrl()].data);
  }

  requests[request.getCollectionUrl()] = request;

  return request
    .on('fetch', (_, __, data) => {
      setState({ [request.getCollectionUrl()]: { data, err: undefined } });
      requests[request.getCollectionUrl()] = undefined;
      !pending() && resolveCallback();
      success(data);
    })
    .on('error', (_, __, err) => {
      setState({ [request.getCollectionUrl()]: { err } });
      requests[request.getCollectionUrl()] = undefined;
      !pending() && resolveCallback();
      error(err);
    })
    .fetch();
};
