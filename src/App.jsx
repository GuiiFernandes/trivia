import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Game from './pages/Game';
import Login from './pages/Login';
import logo from './trivia.png';
import Settings from './pages/Settings';
// import Feedback from './pages/Feedback';
// import Ranking from './pages/Ranking';
import './App.css';

export default function App() {
  return (
    <main className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ Game } />
          <Route path="/settings" component={ Settings } />
          {/* <Route path="/feedback" component={ Feedback } />
          <Route path="/ranking" component={ Ranking } /> */}
        </Switch>
      </header>
    </main>
  );
}
