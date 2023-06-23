import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTrivia } from '../services/API';
import { getStore, removeStore } from '../helpers/localStorage';
import Header from '../components/Header';

class Game extends Component {
  state = {
    questionIndex: 0,
    questions: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = getStore('token');
    const data = await fetchTrivia(token);
    console.log(data);
    if (data.response_code !== 0) {
      removeStore('token');
      history.push('/');
    }
    this.setState({ questions: data.results });
  }

  sortAnswers = (correctAnswer, incorrectAnswers) => {
    const correctAnswerTest = 'correct-answer';
    const answers = [...incorrectAnswers];
    const INCORRECTS_LENGTH = incorrectAnswers.length;
    const randomIndex = Math.round(Math.random() * INCORRECTS_LENGTH);
    answers.splice(randomIndex, 0, correctAnswer);
    return (
      <div data-testid="answer-options">
        {
          answers.map((answer, index) => (
            <button
              key={ index }
              data-testid={ `${answer === correctAnswer
                ? correctAnswerTest : `wrong-answer-${index}`}` }
            >
              {answer}
            </button>
          ))
        }
      </div>
    );
  };

  render() {
    const { questionIndex, questions } = this.state;
    if (questions.length) {
      const { category, question, correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers } = questions[questionIndex];
      console.log(questions[questionIndex].category);
      return (
        <>
          <Header />
          <section>
            <div>
              <h3 data-testid="question-category">{category}</h3>
              <p data-testid="question-text">{question}</p>
            </div>
            {
              this.sortAnswers(correctAnswer, incorrectAnswers)
            }
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
};

export default connect()(Game);
