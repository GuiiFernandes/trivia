import correctIcon from '../images/correct-icon.svg';
import incorrectIcon from '../images/incorrect-icon.svg';
import styles from '../pages/Game.module.css';

const options = ['A', 'B', 'C', 'D'];

export const styleAnswer = {
  correct: {
    border: '3px solid rgb(6, 240, 15)',
    boxShadow: '0px 0px 20px 0px rgb(6, 240, 15)',
  },
  incorrect: {
    border: '3px solid red',
    boxShadow: '0px 0px 20px 0px red',
  },
};

export const getStyleAnswer = (answer, correctAnswer, checkAnswer) => {
  if (checkAnswer) {
    if (answer === correctAnswer) return styleAnswer.correct;
    return styleAnswer.incorrect;
  }
  return {};
};

export const getCheckAnswer = (
  index,
  correctAnswer,
  checkAnswer,
  answerClick,
) => {
  if (checkAnswer && answerClick.index === index) {
    return (
      <img
        className={ styles.answer__icon }
        src={ answerClick.answer === correctAnswer ? correctIcon : incorrectIcon }
        alt={ answerClick.answer === correctAnswer ? 'correct' : 'incorrect' }
      />
    );
  }
  return options[index];
};
