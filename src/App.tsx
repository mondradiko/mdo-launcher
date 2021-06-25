import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '@fontsource/roboto';
import './App.global.css';
import logo from './emblem.svg';
import Homepage from './Homepage';
import Sidenav from './Sidenav';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-name">Mondradiko</div>
      </header>

      <div className="sidenav">
        <Sidenav />
      </div>

      <main className="main">
        <Router>
          <Switch>
            <Route path="/">
              <Homepage name="react sucks" />
            </Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}
