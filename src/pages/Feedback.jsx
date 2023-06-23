import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Header from '../components/Header';

class Feedback extends Component {
  getFeedbackMessage = (assertions) => {
    const lessThanThreeMsg = 'Could be better...';
    const threeOrMoreMsg = 'Well Done!';
    const acertosThreshold = 3;
    if (assertions < acertosThreshold) {
      return lessThanThreeMsg;
    }
    return threeOrMoreMsg;
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {this.getFeedbackMessage(assertions)}
        </p>
        <p>
          Total de Pontos:
          {' '}
          <span data-testid="feedback-total-score">
            {score}
          </span>
        </p>
        <p>
          Respostas Corretas:
          {' '}
          <span data-testid="feedback-total-question">
            {assertions}
          </span>
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    assertions: state.assertions,
    score: state.score,
  };
}

export default connect(mapStateToProps)(Feedback);
