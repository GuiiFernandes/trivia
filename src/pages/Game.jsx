import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { shuffle } from 'lodash';

import { fetchTrivia } from '../services/API';
import { getStore, removeStore, setStore } from '../helpers/localStorage';
import Header from '../components/Header';
import Question from '../components/Question';
import { addScore } from '../redux/actions';
import { getStyleAnswer } from '../helpers/checkAnswer';
import trybe from '../images/icone-trybe.svg';
import styles from './Game.module.css';

const MAX_INDEX = 4;

class Game extends Component {
  state = {
    questionIndex: 0,
    questions: [],
    answers: [],
    time: 30,
    checkAnswer: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = getStore('token');
    const data = await fetchTrivia(token);
    if (data.response_code !== 0) {
      removeStore('token');
      return history.push('/');
    }
    this.setState({
      questions: data.results,
      answers: shuffle([
        data.results[0].correct_answer,
        ...data.results[0].incorrect_answers,
      ]),
    });
    this.initialTimer();
  }

  componentDidUpdate(_, nextState) {
    const { time } = nextState;
    if (time === 1) {
      clearInterval(this.timer);
      this.setState({ checkAnswer: true });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  finishGame = () => {
    const { history, playerName, playerEmail, score } = this.props;

    const rankingData = JSON.parse(localStorage.getItem('ranking')) || [];
    const playerData = {
      name: playerName,
      email: playerEmail,
      score,
    };
    rankingData.push(playerData);

    setStore('ranking', JSON.stringify(rankingData));
    history.push('/feedback');
  };

  initialTimer = () => {
    const INTERVAL = 1000;
    this.timer = setInterval(() => {
      this.setState(({ time }) => ({ time: time - 1 }));
    }, INTERVAL);
  };

  handleClick = (answer) => {
    const { dispatch, history } = this.props;
    const { questionIndex, questions, time, checkAnswer } = this.state;
    const { correct_answer: correctAnswer, difficulty } = questions[questionIndex];
    clearInterval(this.timer);
    this.setState({ checkAnswer: true }, () => {
      if (answer === correctAnswer) {
        const MIN_POINTS = 10;
        const dificultyPoints = { easy: 1, medium: 2, hard: 3 };
        const points = MIN_POINTS + (time * dificultyPoints[difficulty]);
        dispatch(addScore(points));
      }
      if (questionIndex === MAX_INDEX && checkAnswer) history.push('/feedback');
    });
  };

  nextQuestion = () => {
    const { questionIndex, questions, checkAnswer } = this.state;
    const isGameFinished = (questionIndex === MAX_INDEX && checkAnswer);
    if (isGameFinished) {
      this.finishGame();
    } else {
      this.setState(({
        questionIndex: questionIndex + 1,
        time: 30,
        checkAnswer: false,
        answers: shuffle([
          questions[questionIndex + 1].correct_answer,
          ...questions[questionIndex + 1].incorrect_answers,
        ]),
        // answerClick: {},
      }));
      this.initialTimer();
    }
  };

  render() {
    const { questionIndex, questions, time,
      answers, checkAnswer } = this.state;
    if (questions.length) {
      const { correct_answer: correctAnswer } = questions[questionIndex];
      return (
        <main className={ styles.page }>
          <Header />
          <section className={ styles.container__page }>
            <Question
              questions={ questions }
              questionIndex={ questionIndex }
              time={ time }
            />
            <ol className={ styles.container__right } data-testid="answer-options">
              {
                answers.map((answer, index) => (
                  <button
                    key={ index }
                    data-testid={ `${answer === correctAnswer
                      ? 'correct-answer' : `wrong-answer-${index}`}` }
                    className={ styles.answer }
                    style={ getStyleAnswer(answer, correctAnswer, checkAnswer) }
                    type="button"
                    onClick={ () => this.handleClick(answer, index) }
                    disabled={ checkAnswer }
                  >
                    <li className={ styles.letter }>
                      {/* {getCheckAnswer(
                        index,
                        correctAnswer,
                        checkAnswer,
                        answerClick,
                      )} */}
                      {answer}
                    </li>
                  </button>
                ))
              }
            </ol>
            <footer className={ styles.footer }>
              <div className={ styles.footer__container }>
                <img src={ trybe } className={ styles.trybe__icon } alt="logo-trybe" />
                <div className={ styles.footer__btn }>
                  { checkAnswer && (
                    <button
                      className={ styles.btn__next }
                      data-testid="btn-next"
                      onClick={ this.nextQuestion }
                      type="button"
                    >
                      { questionIndex === MAX_INDEX
                        ? 'Ir para Resultado'
                        : 'Próxima Pergunta' }
                    </button>
                  ) }
                </div>
              </div>
            </footer>
          </section>
        </main>
      );
    }
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    playerName: state.player.name,
    playerEmail: state.player.gravatarEmail,
    score: state.player.score,
  };
}

export default connect(mapStateToProps)(Game);
