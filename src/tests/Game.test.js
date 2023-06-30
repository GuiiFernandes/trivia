import { screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from '../App';
import { difficultyPoints, questions } from "./helpers/arrays";

describe('3- Verifica a página de Game', () => {
  jest.setTimeout(50000);
  beforeEach(() => {
    jest.clearAllMocks();
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
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        response_code: 3,
        results: [],
      }),
    });
    const { history } = renderWithRouterAndRedux(<App />);
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

  it('Verifica se ao responder 5 perguntas é redirecionado para a página de feedback', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        response_code: 0,
        results: questions,
      }),
    });
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const btnPlay = screen.getByTestId('btn-play');

    act(() => {
      userEvent.type(emailInput, 'teste@email.com');
      userEvent.type(nameInput, 'Teste');
      userEvent.click(btnPlay);
    });

    await screen.findByTestId('question-category');

    for (let index = 0; index < 5; index += 1) {
      const correctAnswer = screen.getByTestId('correct-answer');
      expect(correctAnswer).toHaveTextContent(questions[index].correct_answer);
      expect(screen.getByTestId('question-text')).toHaveTextContent(questions[index].question);

      act(() => {
        userEvent.click(correctAnswer);
      });

      const nextBtn = screen.getByTestId('btn-next');
      if (index === 4) {
        expect(nextBtn).toHaveTextContent(/ir para resultado/i);
      } 

      act(() => {
        userEvent.click(nextBtn);
      });
    }

    const scoreEl = screen.getByTestId('header-score');
    expect(scoreEl).toHaveTextContent('380');

    await screen.findByTestId('feedback-text');
    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');
  });

  it('Verifica se ao responder as perguntas os pontos são computados corretamente e se a próxima pergunta é renderizada.', async () => {
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

    await screen.findByTestId('question-category');

    let points = 0;

    for (let index = 0; index < 4; index += 1) {
      const correctAnswer = screen.getByTestId('correct-answer');
      expect(correctAnswer).toHaveTextContent(questions[index].correct_answer);
      expect(screen.getByTestId('question-text')).toHaveTextContent(questions[index].question);

      act(() => {
        userEvent.click(correctAnswer);
      });

      
      const time = screen.getByTestId('timer-container').lastChild.childNodes[0].textContent.split(' ')[1];
      points += 10 + Number(time) * difficultyPoints[questions[index].difficulty];

      const scoreEl = screen.getByTestId('header-score');
      expect(scoreEl).toHaveTextContent(`${points}`);

      const nextBtn = screen.getByTestId('btn-next');
      expect(nextBtn).toBeVisible();

      act(() => {
        userEvent.click(nextBtn);
      });
    }

    await waitFor(() => {
      expect(screen.getByTestId('timer-container').lastChild).toHaveTextContent('Tempo: 26 s');
    }, {timeout: 5000});


    const incorrectAnswers = screen.getAllByTestId(/wrong-answer/);

    act(() => {
      userEvent.click(incorrectAnswers[0]);
    });
    const scoreEl = screen.getByTestId('header-score');
    expect(scoreEl).toHaveTextContent(`${points}`);
    
    const nextBtn = screen.getByTestId('btn-next');
    expect(nextBtn).toBeVisible();
  });

  it('Verifica se o timer fica amarelo e vermelho abaixo de 15 e 8 segundos, se os botões são desabilitados após 30 segundos, se o botão de next aparece e se as bordas aparecem nas respostas', async () => {
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