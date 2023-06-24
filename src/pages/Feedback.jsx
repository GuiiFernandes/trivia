import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    const { assertions } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {this.getFeedbackMessage(assertions)}
        </p>
        <button type="button" data-testid="btn-next">Jogar Novamente</button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    assertions: state.player.assertions,
  };
}

export default connect(mapStateToProps)(Feedback);
