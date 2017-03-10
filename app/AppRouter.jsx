import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Contact from './components/Contact';
import Audioasyl from './components/Audioasyl';
import TileDetails from './components/tileDetail/TileDetails';

const AppRouter = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Audioasyl} />
    <Route path="/contact" component={Contact} />
    <Route path="/:category">
      <Router path="details/:id" component={TileDetails} />
    </Route>
  </Router>
);

export default AppRouter;
