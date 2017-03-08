import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies

import './index.scss';
import AppRouter from './AppRouter';

render(
  <AppContainer>
    <AppRouter />
  </AppContainer>,
  document.querySelector('#audioasylRoot'),
);

if (module && module.hot) {
  module.hot.accept('./AppRouter', () =>
  render(
    <AppContainer>
      <AppRouter />
    </AppContainer>,
    document.querySelector('#audioasylRoot'),
  ),
);
}
