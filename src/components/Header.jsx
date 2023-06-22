import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  getGravatarUrl = (playerEmail) => `https://www.gravatar.com/avatar/${md5(playerEmail).toString()}`;

  render() {
    const { email, name } = this.props;

    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ this.getGravatarUrl(email) }
          alt={ name }
        />
        <span data-testid="header-player-name">
          {name}
        </span>
        <span data-testid="header-score">
          0
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    email: state.player.gravatarEmail,
    name: state.player.name,
  };
}

export default connect(mapStateToProps)(Header);
