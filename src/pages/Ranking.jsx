import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getStore } from '../helpers/localStorage';
import getGravatarUrl from '../helpers/gravatarUrl';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(getStore('ranking'));
    if (ranking) {
      this.setState({
        ranking: this.sortRanking(ranking),
      });
    }
  }

  sortRanking(ranking) {
    return ranking.sort((a, b) => b.score - a.score);
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Início
          </button>
        </Link>
        <ul>
          {ranking.map((player, index) => (
            <li key={ index }>
              <img src={ getGravatarUrl(player.email) } alt={ player.name } />
              <span data-testid={ `player-name-${index}` }>{player.name}</span>
              {' '}
              <span data-testid={ `player-score-${index}` }>{player.score}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect()(Ranking);
