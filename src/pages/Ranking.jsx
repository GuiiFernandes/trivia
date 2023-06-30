import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getStore } from '../helpers/localStorage';
import getGravatarUrl from '../helpers/gravatarUrl';
import logo from '../images/logo-trivia.svg';
import star from '../images/icon-star.svg';
import styles from './Ranking.module.css';

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
      <main className={ styles.page }>
        <section className={ styles.container }>
          <img src={ logo } className={ `App-logo ${styles.logo__img}` } alt="logo" />
          <h1
            className={ styles.title }
            data-testid="ranking-title"
          >
            Ranking
          </h1>
          <ul className={ styles.ranking__container }>
            {ranking.map((player, index) => (
              <li
                className={ styles.player__container }
                key={ index }
              >
                <div className={ styles.player }>
                  <img
                    className={ styles.img__gravatar }
                    src={ getGravatarUrl(player.email) }
                    alt={ player.name }
                  />
                  <span data-testid={ `player-name-${index}` }>{player.name}</span>
                </div>
                <div className={ styles.score }>
                  <img className={ styles.star } src={ star } alt="icone de estrela" />
                  <p>
                    <span data-testid={ `player-score-${index}` }>{player.score}</span>
                    { ' ' }
                    pontos
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/">
            <button
              className={ styles.btn }
              type="button"
              data-testid="btn-go-home"
            >
              Jogar novamente
            </button>
          </Link>
        </section>
      </main>
    );
  }
}

export default connect()(Ranking);
