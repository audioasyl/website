import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { XMLHttpRequest } from 'xmlhttprequest';
import Helmet from 'react-helmet';
import React from 'react';

import { resolveAll, getState } from '../app/superFetch';
import index from '../index.html';
import routes from './routes';

global.XMLHttpRequest = XMLHttpRequest;

export default function (req, res) {
  if (typeof window === 'undefined') {
    global.window = {
      location: {
        href: `${protocol(req)}://${req.headers.host}${req.baseUrl}`,
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
      Helmet.renderStatic();
      resolveAll()
        .then(() => {
          const html = index.replace(
            '#audioasylRoot',
            renderToString(<RouterContext {...renderProps} />)
          );
          res.status(200).send(appendPreloadState(replaceHeaders(html, Helmet.renderStatic())));
        }
      );
    } else {
      res.status(404).send('Not found');
    }
  });
}

const replaceHeaders = (html, headers) => {
  const headersHtml = `
    ${headers.title.toString()}
    ${headers.meta.toString()}
  `;

  return html.replace('<meta property="audioasyl:headers" />', headersHtml);
};

const protocol = req => (req.connection.encrypted ? 'https' : 'http');

const appendPreloadState = html =>
  html.replace('"<preloadedState>"', JSON.stringify(getState()).replace(/</g, '\\u003c'));
