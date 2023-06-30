import { screen } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from '../App';
import { initialState, ranking, sortRanking } from "./helpers/arrays";

describe('3- Verifica a página de Ranking', () => {
  it('Verifica se os componentes estão sendo renderizados na página de Ranking', () => {
    localStorage.setItem('ranking', JSON.stringify(ranking));

    renderWithRouterAndRedux(<App />, initialState, '/ranking' );
    const titleRanking = screen.getByTestId('ranking-title');
    const listRanking = screen.getByRole('list');

    expect(titleRanking).toHaveTextContent(/ranking/i);
    expect(listRanking).toBeVisible();
    expect(listRanking.children).toHaveLength(5);
    sortRanking.forEach(({name, score}, index) => {
      expect(listRanking.children[index]).toHaveTextContent(`${name}${score} pontos`);
    });
  });
});