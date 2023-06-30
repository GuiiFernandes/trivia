import { screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from '../App';
import { questions } from "./helpers/arrays";
import { wait } from "@testing-library/user-event/dist/utils";

jest.setTimeout(40000);

describe('3- Verifica a página de Game', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('Verifica se os componentes estão sendo renderizados na página de Game', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        response_code: 0,
        results: questions,
      }),
    });
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const btnPlay = screen.getByTestId('btn-play');


    act(() => {
      userEvent.type(emailInput, 'teste@email.com');
      userEvent.type(nameInput, 'Teste');
      userEvent.click(btnPlay);
    });


    const categoryQuestion = await screen.findByTestId('question-category');
    const textQuestion = screen.getByTestId('question-text');
    const listAnswer = screen.getByRole('list');

    expect(categoryQuestion).toHaveTextContent(/Entertainment: Video Games/i);
    expect(textQuestion).toBeVisible();
    expect(listAnswer.children).toHaveLength(4);
  });

  it('Verifica se ao passar um token inválido retorna para a página inicial', async () => {
    jest.setTimeout(32000);
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        response_code: 3,
        results: [],
      }),
    });
    const {history} = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const btnPlay = screen.getByTestId('btn-play');


    act(() => {
      userEvent.type(emailInput, 'teste@email.com');
      userEvent.type(nameInput, 'Teste');
      userEvent.click(btnPlay);
    });
    
    await screen.findByTestId('input-player-name');
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se o timer fica amarelo e vermelho abaixo de 15 e 8 segundos, se os botões são desabilitados após 30 segundos, se o botão de next aparece e se as bordas aparecem nas respostas', async () => {
    jest.setTimeout(40000);
    jest.spyOn(global, 'setInterval');
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        response_code: 0,
        results: questions,
      }),
    });
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const btnPlay = screen.getByTestId('btn-play');


    act(() => {
      userEvent.type(emailInput, 'teste@email.com');
      userEvent.type(nameInput, 'Teste');
      userEvent.click(btnPlay);
    });

    // await screen.findByText(/tempo: 30 s/i);

    await waitFor(() => {
      expect(screen.getByTestId('timer-container').style.color).toBe('rgb(242, 183, 5)');
    }, {timeout: 16000});
    await waitFor(() => {
      expect(screen.getByTestId('timer-container').style.color).toBe('rgb(234, 93, 93)');
    }, {timeout: 8000});
    await waitFor(() => {
      expect(screen.getByTestId('btn-next')).toBeVisible();
    }, {timeout: 10000});


    const wrongAnswers = screen.getAllByTestId(/wrong-answer/i);
    const correctAnswer = screen.getByTestId('correct-answer');
    
    expect(correctAnswer.style.border).toBe('3px solid rgb(6, 240, 15)');
    expect(correctAnswer).toBeDisabled();
    expect(wrongAnswers[0].style.border).toBe('3px solid red');
    expect(wrongAnswers[0]).toBeDisabled();
    expect(wrongAnswers[1].style.border).toBe('3px solid red');
    expect(wrongAnswers[1]).toBeDisabled();
    expect(wrongAnswers[2].style.border).toBe('3px solid red');
    expect(wrongAnswers[2]).toBeDisabled();

    const scoreEl = screen.getByTestId('header-score');
    expect(scoreEl).toHaveTextContent('0');
  });
});