import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { connect } from 'react-redux';

import { fetchToken } from '../services/API';
import { setStore, getStore } from '../helpers/localStorage';
import { savePlayer, resetGameData } from '../redux/actions';
import logo from '../images/logo-trivia.svg';
import trybe from '../images/icone-trybe.svg';
import settingsIcon from '../images/settings-icon.svg';
import styles from './Login.module.css';

class Login extends Component {
  state = {
    name: '',
    gravatarEmail: '',
  };

  componentDidMount() {
    const { dispatchResetGameData } = this.props;
    dispatchResetGameData();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  btnsettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleSubmit = async () => {
    const { history, dispatchSavePlayer } = this.props;
    const token = getStore('token') || await fetchToken().token;
    setStore('token', token);
    dispatchSavePlayer(this.state);
    history.push('/game');
  };

  render() {
    const { name, gravatarEmail } = this.state;
    return (
      <main className={ styles.page }>
        <img src={ logo } className="App-logo" alt="logo" />
        <form
          className={ styles.form__container }
          onSubmit={ (e) => {
            e.preventDefault(); // preventdefault previne a pagina de recarregar ao dar submit com botao
            this.handleSubmit();
          } }
        >
          <input
            className={ styles.input__text }
            data-testid="input-gravatar-email"
            type="email"
            name="gravatarEmail"
            id="email"
            value={ gravatarEmail }
            placeholder="Qual é o seu e-mail do gravatar?"
            onChange={ this.handleChange }
          />
          <input
            className={ styles.input__text }
            data-testid="input-player-name"
            type="text"
            name="name"
            id="name"
            value={ name }
            placeholder="Digite seu nome de usuário"
            onChange={ this.handleChange }
          />
          <button
            className={ styles.btn__play }
            data-testid="btn-play"
            disabled={ !(name.length && validator.isEmail(gravatarEmail)) }
          >
            JOGAR
          </button>
          <button
            className={ styles.btn__settings }
            type="button"
            data-testid="btn-settings"
            onClick={ this.btnsettings }
          >
            <img src={ settingsIcon } alt="engrenagem" />
            Configurações
          </button>
        </form>
        <img src={ trybe } className={ styles.trybe__icon } alt="logo-trybe" />
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatchSavePlayer: PropTypes.func.isRequired,
  dispatchResetGameData: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSavePlayer: (player) => dispatch(savePlayer(player)),
  dispatchResetGameData: () => dispatch(resetGameData()),
});

export default connect(null, mapDispatchToProps)(Login);
