import { screen, waitFor, act } from "@testing-library/react";
import Feedback from "../pages/Feedback";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import App from '../App';

describe('2- Verifica a página de Feedback', () => {
    it('Verifica se os componentes estão sendo renderizados na página de Feedback', () => {
      renderWithRouterAndRedux(<Feedback />);
      const headerPicture = screen.getByTestId('header-profile-picture');
      const headerName = screen.getByTestId('header-player-name');
      const headerScore = screen.getByTestId('header-score');
      const feedbackText = screen.getByTestId('feedback-text');
      const totalScore = screen.getByTestId('feedback-total-score');
      const totalQuestion = screen.getByTestId('feedback-total-question');
      const btnPlayAgain = screen.getByTestId('btn-play-again');
      const btnRanking = screen.getByTestId('btn-ranking');

      expect(headerPicture).toBeInTheDocument();
      expect(headerName).toBeInTheDocument();
      expect(headerScore).toBeInTheDocument();
      expect(feedbackText).toBeInTheDocument();
      expect(totalScore).toBeInTheDocument();
      expect(totalQuestion).toBeInTheDocument();
      expect(btnPlayAgain).toBeInTheDocument();
      expect(btnRanking).toBeInTheDocument();
  });

  it('Verifica se é redirecionado para a rota inicial ao clicar no botão Play Again', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
        history.push('/feedback')
    });

    const btnPlayAgain = screen.getByTestId('btn-play-again');
    expect(btnPlayAgain).toBeInTheDocument();

    userEvent.click(btnPlayAgain);

    await waitFor(() => {
        const { pathname } = history.location;
        expect(pathname).toBe('/');
    }, 5000)
  });

  it('Verifica se é redirecionado para a rota /ranking ao clicar no botão Ranking', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
        history.push('/feedback')
    });

    const btnRanking = await screen.findByTestId('btn-ranking');
    expect(btnRanking).toBeInTheDocument();
    
    userEvent.click(btnRanking);

    await waitFor(() => {
        const { pathname } = history.location;
        expect(pathname).toBe('/ranking');
    }, 5000)
  });
});