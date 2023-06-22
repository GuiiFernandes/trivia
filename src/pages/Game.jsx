import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    return (
      <div>Game</div>
    );
  }
}

const mapStateToProps = (state) => ({
  globalState: state,
});

export default connect(mapStateToProps)(Game);
