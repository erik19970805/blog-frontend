import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/global/Footer';
import Header from './components/global/Header';
import PageRender from './PageRender';
import Alert from './components/alert/Alert';

const App = (): JSX.Element => (
  <div className="container">
    <Router>
      <Alert />
      <Header />
      <Switch>
        <Route exact path="/" component={PageRender} />
        <Route exact path="/:page" component={PageRender} />
        <Route exact path="/:page/:slug" component={PageRender} />
      </Switch>
      <Footer />
    </Router>
  </div>
);

export default App;
