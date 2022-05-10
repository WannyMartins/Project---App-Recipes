import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RecipesProvider from '../context/recipesProvider';
import renderWithRouter from '../helpers/renderWithRouter';
import Drinks from '../pages/drinks/Drinks';

const TWELVE = 12;
async function alert() {
  return screen
    .findAllByText('Sorry, we haven/\'t found any recipes for these filters.');
}

const firstCard = '0-card-img';

describe('Drinks', () => {
  it('Verifica a tela Drinks há 12 cards', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Drinks />
      </RecipesProvider>,
    );

    const cardDrinks = await screen.findAllByTestId(/[0-9]{1,2}-recipe-card/i);

    expect(cardDrinks).toHaveLength(TWELVE);
  });

  it('Verifica se ao clicar na receita encaminha para details recipeDrinks', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Drinks />
      </RecipesProvider>,
    );
    const firstRecipeDrinks = await screen.findByTestId(firstCard);
    expect(firstRecipeDrinks).toBeInTheDocument();
    userEvent.click(firstRecipeDrinks);

    const { pathname } = history.location;

    expect(pathname).toBe('/drinks/15997');
  });

  it('Verifica a tela Drinks há botoes de categorias', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Drinks />
      </RecipesProvider>,
    );

    await screen.findAllByRole('button');
  });
  it('Verifica a tela Drinks há botão All', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Drinks />
      </RecipesProvider>,
    );

    const allDrinks = screen.getByRole('button', { name: 'All' });
    expect(allDrinks).toBeInTheDocument();
    userEvent.click(allDrinks);
    const firstRecipeGG = await screen.findByTestId(firstCard);
    expect(firstRecipeGG).toBeInTheDocument();
  });

  it('Verifica a tela Drinks aparece mensagem de receita não encontrada', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Drinks />
      </RecipesProvider>,
    );

    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const nameDrinks = screen.getByLabelText('Name');
    userEvent.click(nameDrinks);
    const inputSearchDrinks = screen.getByTestId('search-input');
    userEvent.type(inputSearchDrinks, 'receita que não existe');
    const btnBuscarDrinks = screen.getByTestId('exec-search-btn');
    userEvent.click(btnBuscarDrinks);
    global.alert = jest.fn()
      .mockReturnValue(alert());
  });
});
