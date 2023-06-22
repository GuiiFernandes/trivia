import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import Login from './pages/Login';
import Settings from './pages/Settings';
// import Game from './pages/Game';
// import Feedback from './pages/Feedback';
// import Ranking from './pages/Ranking';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
          {/* <Route path="/game" component={ Game } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/ranking" component={ Ranking } /> */}
        </Switch>
      </header>
    </div>
  );
}
