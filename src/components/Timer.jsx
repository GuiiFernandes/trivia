import React, { Component } from 'react';

export default class Timer extends Component {
  state = {
    time: 5,
  };

  componentDidMount() {
    const INTERVAL = 1000;
    this.timer = setInterval(() => {
      this.setState(({ time }) => ({ time: time - 1 }));
    }, INTERVAL);
  }

  shouldComponentUpdate(_, nextState) {
    const { time } = nextState;
    if (time === 0 - 1) {
      clearInterval(this.timer);
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { time } = this.state;
    return (
      <div>{time}</div>
    );
  }
}
