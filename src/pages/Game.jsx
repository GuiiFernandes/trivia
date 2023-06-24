import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTrivia } from '../services/API';
import { getStore, removeStore } from '../helpers/localStorage';
import Header from '../components/Header';
import { addScore } from '../redux/actions';

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
      answers: this.sortAnswers([
        data.results[0].correct_answer,
        ...data.results[0].incorrect_answers,
      ]),
    });
    this.initialTimer();
  }

  componentDidUpdate(_, nextState) {
    const { history } = this.props;
    const { questionIndex, checkAnswer } = this.state;
    const { time } = nextState;
    if (time === 1) {
      clearInterval(this.timer);
      this.setState({ checkAnswer: true });
    }
    if (questionIndex === MAX_INDEX && checkAnswer) history.push('/feedback');
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  initialTimer = () => {
    const INTERVAL = 1000;
    this.timer = setInterval(() => {
      this.setState(({ time }) => ({ time: time - 1 }));
    }, INTERVAL);
  };

  sortAnswers = (answers) => {
    const SUB_SORT = 0.5;
    return answers.sort(() => Math.random() - SUB_SORT);
  };

  styleAnswer = (answer, correctAnswer) => {
    const { checkAnswer } = this.state;
    if (checkAnswer) {
      if (answer === correctAnswer) return { border: '3px solid rgb(6, 240, 15)' };
      return { border: '3px solid red' };
    }
    return {};
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
    const { questionIndex, questions } = this.state;
    this.setState(({
      questionIndex: questionIndex + 1,
      time: 30,
      checkAnswer: false,
      answers: this.sortAnswers([
        questions[questionIndex + 1].correct_answer,
        ...questions[questionIndex + 1].incorrect_answers,
      ]),
    }));
    this.initialTimer();
  };

  render() {
    const { questionIndex, questions, time, answers, checkAnswer } = this.state;
    if (questions.length) {
      const { category, question,
        correct_answer: correctAnswer } = questions[questionIndex];
      return (
        <>
          <Header />
          <section>
            <div>
              <h3 data-testid="question-category">{category}</h3>
              <p data-testid="question-text">{question}</p>
              <p>{`Tempo: ${time} s`}</p>
            </div>
            <div data-testid="answer-options">
              {
                answers.map((answer, index) => (
                  <button
                    key={ index }
                    style={ this.styleAnswer(answer, correctAnswer) }
                    data-testid={ `${answer === correctAnswer
                      ? 'correct-answer' : `wrong-answer-${index}`}` }
                    type="button"
                    onClick={ () => this.handleClick(answer) }
                    disabled={ checkAnswer }
                  >
                    {answer}
                  </button>
                ))
              }
            </div>
            { checkAnswer && questionIndex !== MAX_INDEX && (
              <button
                data-testid="btn-next"
                onClick={ this.nextQuestion }
                type="button"
              >
                Próxima Pergunta
              </button>
            ) }
          </section>
        </>
      );
    }
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
