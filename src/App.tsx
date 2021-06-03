import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageRender from './PageRender';

const App = (): JSX.Element => (
  <div className="container">
    <Router>
      <Switch>
        <Route exact path="/" component={PageRender} />
        <Route exact path="/:page" component={PageRender} />
        <Route exact path="/:pag/:slug" component={PageRender} />
      </Switch>
    </Router>
  </div>
);

export default App;
