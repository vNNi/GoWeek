import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/Login/Login';
import Timelime from './pages/Timeline/Timeline';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/timeline" component={Timelime} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
