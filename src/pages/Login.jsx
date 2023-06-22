import React, { Component } from 'react';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isPlayButtonDisabled: true,
  };

  loginButtonValidation = () => {
    const { name, email } = this.state;
    const NUMBER_ZERO = 0;
    // const isEmailValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); (validacao de formato de email)
    const isEmailValid = email.length > NUMBER_ZERO;
    const isNameValid = name.length > NUMBER_ZERO;
    const validation = !(isEmailValid && isNameValid);
    this.setState({ isPlayButtonDisabled: validation });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.loginButtonValidation);
  };

  render() {
    const { name, email, isPlayButtonDisabled } = this.state;
    return (
      <form
        onSubmit={ (e) => {
          e.preventDefault(); // preventdefault previne a pagina de recarregar ao dar submit com botao
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
            type="text"
            name="email"
            id="email"
            value={ email }
            placeholder="Seu email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          disabled={ isPlayButtonDisabled }
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
