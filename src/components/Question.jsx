import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CgTimer } from 'react-icons/cg';

import triviaCategories from '../helpers/triviaCategories';
import logo from '../images/logo-trivia.svg';
import trybe from '../images/icone-trybe.svg';
import styles from './Question.module.css';

export default class Question extends Component {
  colorTimer = () => {
    const RED_TIME = 8;
    const YELLOW_TIME = 15;
    const { time } = this.props;
    if (time <= RED_TIME) return { color: '#ea5d5d' };
    if (time <= YELLOW_TIME) return { color: '#f2b705' };
    return { color: 'black' };
  };

  render() {
    const { questions, questionIndex, time } = this.props;
    if (questions.length) {
      const { category, question } = questions[questionIndex];
      const { backgroundColor } = triviaCategories.find(({ name }) => name === category);
      return (
        <div className={ styles.container__left }>
          <img src={ logo } className={ `App-logo ${styles.logo}` } alt="logo" />
          <div className={ styles.container__question }>
            <div />
            <h3
              style={ { backgroundColor } }
              className={ styles.question__category }
              data-testid="question-category"
            >
              {category}
            </h3>
            <p data-testid="question-text">{question}</p>
            <div className={ styles.timer } style={ this.colorTimer() }>
              <CgTimer size="20px" />
              <span>{`Tempo: ${time} s`}</span>
            </div>
          </div>
          <img src={ trybe } className={ styles.trybe__icon } alt="logo-trybe" />
        </div>
      );
    }
  }
}

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  questionIndex: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
};
