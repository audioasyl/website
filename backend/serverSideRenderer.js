import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { XMLHttpRequest } from 'xmlhttprequest';
import React from 'react';

import { resolveAll } from '../app/superFetch';
import index from '../index.html';
import routes from './routes';

global.XMLHttpRequest = XMLHttpRequest;

export default function (req, res) {
  if (typeof window === 'undefined') {
    global.window = {
      location: {
        href: req.url,
      },
    };
  }

  match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      renderToString(<RouterContext {...renderProps} />);
      resolveAll()
        .then(() => {
          res.status(200).send(
            index.replace('#audioasylRoot',
            renderToString(<RouterContext {...renderProps} />))
          );
        }
      );
    } else {
      res.status(404).send('Not found');
    }
  });
}
