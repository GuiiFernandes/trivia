import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmail from 'validator/es/lib/isEmail';
import { connect } from 'react-redux';

import { fetchTriviaAction, savePlayer } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    gravatarEmail: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  btnsettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleSubmit = async () => {
    const { history, dispatchFetchTrivia, dispatchSavePlayer } = this.props;
    dispatchSavePlayer(this.state);
    await dispatchFetchTrivia();
    history.push('/game');
  };

  render() {
    const { name, gravatarEmail } = this.state;
    return (
      <form
        onSubmit={ (e) => {
          e.preventDefault(); // preventdefault previne a pagina de recarregar ao dar submit com botao
          this.handleSubmit();
        } }
      >
        <label htmlFor="name">
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            id="name"
            value={ name }
            placeholder="Digite seu nome de usuário"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="gravatarEmail"
            id="email"
            value={ gravatarEmail }
            placeholder="Seu email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          disabled={ !(name.length && isEmail(gravatarEmail)) }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.btnsettings }
        >
          Configurações
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatchFetchTrivia: PropTypes.func.isRequired,
  dispatchSavePlayer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchTrivia: () => dispatch(fetchTriviaAction()),
  dispatchSavePlayer: (player) => dispatch(savePlayer(player)),
});

export default connect(null, mapDispatchToProps)(Login);
