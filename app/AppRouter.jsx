import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Contact from './components/Contact';
import Audioasyl from './components/Audioasyl';
// import Albums from './albums/Albums';
// import Artists from './artists/Artists';
// import AlbumDetails from './albums/AlbumDetails';
// import ArtistDetails from './artists/ArtistDetails';

const AppRouter = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Audioasyl} />
    <Route path="/contact" component={Contact} />
    {/* <Route path="/albums">
      <IndexRoute component={Albums} />
      <Router path="details/:id" component={AlbumDetails} />
    </Route>
    <Route path="/artists">
      <IndexRoute component={Artists} />
      <Router path="details/:id" component={ArtistDetails} />
    </Route>*/}
  </Router>
);

export default AppRouter;
