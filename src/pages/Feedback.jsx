import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import logo from '../images/logo-trivia.svg';
import styles from './Feedback.module.css';
import getGravatarUrl from '../helpers/gravatarUrl';
import Header from '../components/Header';

class Feedback extends Component {
  state = {
    feedback: '',
  };

  componentDidMount() {
    const HIT_THRESHOLD = 3;
    const { assertions } = this.props;
    this.setState({
      feedback: assertions < HIT_THRESHOLD ? 'Could be better...' : 'Well Done!',
    });
  }

  render() {
    const { feedback } = this.state;
    const goodFeedback = feedback === 'Well Done!';
    const { assertions, score, gravatarEmail } = this.props;
    return (
      <main className={ styles.page }>
        <div style={ { display: 'none' } }>
          <Header />
        </div>
        <img src={ logo } className={ `App-logo ${styles.logo__img}` } alt="logo" />
        <section className={ styles.feedback__container }>
          <img
            style={ { border: `4px solid ${goodFeedback ? '#2FC18C' : '#EA5D5D'}` } }
            className={ styles.img__gravatar }
            src={ getGravatarUrl(gravatarEmail) }
            alt="Gravatar foto"
          />
          <p
            data-testid="feedback-text"
            style={ { color: `${goodFeedback ? '#2FC18C' : '#EA5D5D'}` } }
            className={ styles.text__feedback }
          >
            {feedback}
          </p>
          <p className={ styles.text__score }>
            Você acertou
            {' '}
            <span data-testid="feedback-total-question">
              {assertions}
            </span>
            {' '}
            questões!
          </p>
          <p className={ styles.text__score }>
            Um total de
            {' '}
            <span data-testid="feedback-total-score">
              {score}
            </span>
            {' '}
            pontos
          </p>
        </section>
        <aside className={ styles.btns }>
          <Link to="/ranking">
            <button
              className={ `${styles.btn} ${styles.ranking}` }
              type="button"
              data-testid="btn-ranking"
            >
              Ver Ranking
            </button>
          </Link>
          <Link to="/">
            <button
              className={ `${styles.btn} ${styles.play}` }
              type="button"
              data-testid="btn-play-again"
            >
              Jogar Novamente
            </button>
          </Link>
        </aside>
        <footer className={ styles.footer } />
      </main>
    );
  }
}

Feedback.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    gravatarEmail: state.player.gravatarEmail,
    assertions: state.player.assertions,
    score: state.player.score,
  };
}

export default connect(mapStateToProps)(Feedback);
