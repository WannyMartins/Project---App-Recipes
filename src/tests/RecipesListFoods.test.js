import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RecipesProvider from '../context/recipesProvider';
import renderWithRouter from '../helpers/renderWithRouter';
import Foods from '../pages/foods/Foods';

const TWELVE = 12;
async function alert() {
  return screen
    .findAllByText('Sorry, we haven/\'t found any recipes for these filters.');
}

const firstCard = '0-card-img';

describe('Foods', () => {
  it('Verifica a tela Foods há 12 cards', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Foods />
      </RecipesProvider>,
    );

    const cards = await screen.findAllByTestId(/[0-9]{1,2}-recipe-card/i);

    expect(cards.length).toEqual(TWELVE);
  });

  it('Verifica se ao clicar na receita encaminha para details', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Foods />
      </RecipesProvider>,
    );
    const firstRecipe = await screen.findByTestId(firstCard);
    expect(firstRecipe).toBeInTheDocument();
    userEvent.click(firstRecipe);

    const { pathname } = history.location;

    expect(pathname).toBe('/foods/52977');
  });

  it('Verifica a tela Foods há botoes de categorias', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Foods />
      </RecipesProvider>,
    );

    await screen.findAllByRole('button');
  });

  it('Verifica a tela Foods há botão All', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Foods />
      </RecipesProvider>,
    );

    const all = screen.getByRole('button', { name: 'All' });
    expect(all).toBeInTheDocument();
    userEvent.click(all);
    const firstRecipeCorba = await screen.findByTestId(firstCard);
    expect(firstRecipeCorba).toBeInTheDocument();
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
    userEvent.type(inputSearch, 'receita que não existe');
    const btnBuscar = screen.getByTestId('exec-search-btn');
    userEvent.click(btnBuscar);
    global.alert = jest.fn()
      .mockReturnValue(alert);
  });
});
