import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getGravatarUrl from '../helpers/gravatarUrl';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;

    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ getGravatarUrl(email) }
          alt={ name }
        />
        <span data-testid="header-player-name">
          { name }
        </span>
        <span data-testid="header-score">
          { score }
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    email: state.player.gravatarEmail,
    name: state.player.name,
    score: state.player.score,
  };
}

export default connect(mapStateToProps)(Header);
