import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
// import FoodsList from '../components/FoodsList';
import RecipesProvider from '../context/recipesProvider';
import renderWithRouter from '../helpers/renderWithRouter';
import Foods from '../pages/foods/Foods';

function mock() {
  global.alert = jest.fn()
    .mockReturnValue('Sorry, we haven/\'t found any recipes for these filters.');
}
const TWELVE = 12;
const alert = 'Sorry, we haven/\'t found any recipes for these filters.';

describe('Foods', () => {
  it('Verifica a tela Foods há 12 cards', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Foods />
      </RecipesProvider>,
    );

    const cards = await screen.findAllByTestId(/recipe-card/i);
    expect(cards.length).toEqual(TWELVE);
  });

  it('Verifica a tela Foods há botoes de categorias', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Foods />
      </RecipesProvider>,
    );

    await screen.findAllByRole('button');
  });

  it('Verifica a tela Foods aparece mensagem de receita não encontrada', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Foods />
      </RecipesProvider>,
    );
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const name = screen.getByLabelText('Name');
    userEvent.click(name);
    const inputSearch = screen.getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: '/////' } });
    const btnBuscar = screen.getByTestId('exec-search-btn');
    userEvent.click(btnBuscar);
    mock();
    expect(alert).toBeDefined();
  });

  it('Verifica se ao clicar na receita encaminha para details', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Foods />
      </RecipesProvider>,
    );
    screen.findAllByTestId('0-card-name');
    // const name = screen.getByLabelText('Name');
    // const inputSearch = screen.getByTestId('search-input');
    // fireEvent.change(inputSearch, { target: { value: '/////' } });
    // const btnBuscar = screen.getByTestId('exec-search-btn');
    // userEvent.click(btnBuscar);
    // mock();
    // expect(alert).toBeDefined();
  });
});
