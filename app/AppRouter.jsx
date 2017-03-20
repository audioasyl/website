import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Contact from './components/Contact';
import Audioasyl from './components/Audioasyl';
import TileDetails from './components/tileDetail/TileDetails';
import TileCarousel from './components/tileDetail/TileCarousel';
import AudioasylPlayer from './components/player/AudioasylPlayer';

const AppRouter = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AudioasylPlayer} >
      <IndexRoute component={Audioasyl} />
      <Route path=":category/details/:id" component={TileCarousel}>
        <IndexRoute component={TileDetails} />
      </Route>
    </Route>
    <Route path="/contact" component={Contact} />
  </Router>
);

export default AppRouter;
