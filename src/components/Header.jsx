import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getGravatarUrl from '../helpers/gravatarUrl';
import star from '../images/icon-star.svg';
import styles from './Header.module.css';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;

    return (
      <header className={ styles.container }>
        <div className={ styles.content }>
          <div className={ styles.profile }>
            <img
              className={ styles.img__gravatar }
              data-testid="header-profile-picture"
              src={ getGravatarUrl(email) }
              alt={ name }
            />
            <span data-testid="header-player-name">
              { name }
            </span>
          </div>
          <div className={ styles.score }>
            <img src={ star } alt="icone de estrela" />
            Pontos:
            <span data-testid="header-score" className={ styles.score__number }>
              { score }
            </span>
          </div>
        </div>
      </header>
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
