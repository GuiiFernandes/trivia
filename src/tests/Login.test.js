import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import App from "../App";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('1- Verifica a página de Login', () => {
  it('Verifica se os componentes estão sendo renderizados na tela inicial', () => {
    renderWithRouterAndRedux(<App />)
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    const btnSettings = screen.getByTestId('btn-settings');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(btnPlay).toBeInTheDocument();
    expect(btnSettings).toBeInTheDocument();
  });

  it('Verifica se o botão Play está desabilitado quando os inputs estiverem vazios', () => {
    renderWithRouterAndRedux(<App />)
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.clear(inputName);
    userEvent.clear(inputEmail);

    expect(btnPlay).toBeDisabled();
  });

  it('Verifica se o botão Play está desabilitado quando apenas o input do nome estiver preenchido', () => {
    renderWithRouterAndRedux(<App />)
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(inputName, 'Name');
    userEvent.clear(inputEmail);

    expect(btnPlay).toBeDisabled();
  });

  it('Verifica se o botão Play está desabilitado quando apenas o input do email estiver preenchido', () => {
    renderWithRouterAndRedux(<App />)
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.clear(inputName);
    userEvent.type(inputEmail, 'email@email.com');

    expect(btnPlay).toBeDisabled();
  });

  it('Verifica se o botão Play está habilitado quando os inputs estiverem preenchidos', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    
    userEvent.type(inputName, 'Name');
    userEvent.type(inputEmail, 'email@email.com');
    
    expect(btnPlay).toBeEnabled();
  });

  it('Verifica se é redirecionado para a rota /game ao clicar no botão Play', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(inputName, 'Name');
    userEvent.type(inputEmail, 'email@email.com');

    await waitFor(() => {
      userEvent.click(btnPlay);
      const { pathname } = history.location;
      expect(pathname).toBe('/game');
    }, {timeout: 5000})

  });

  it('Verifica se é redirecionado para a rota /settings ao clicar no botão Configurações', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnSettins = screen.getByTestId('btn-settings');

    userEvent.click(btnSettins);
    
    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  });
});
