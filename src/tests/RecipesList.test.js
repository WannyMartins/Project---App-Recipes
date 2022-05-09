import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RecipesProvider from '../context/recipesProvider';
import renderWithRouter from '../helpers/renderWithRouter';
import Drinks from '../pages/drinks/Drinks';
import Foods from '../pages/foods/Foods';

const TWELVE = 12;
async function alert() {
  return screen
    .findAllByText('Sorry, we haven/\'t found any recipes for these filters.');
}

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

  it('Verifica se ao clicar na receita encaminha para details', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Foods />
      </RecipesProvider>,
    );
    const firstRecipe = await screen.findByTestId('0-card-img');
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
    userEvent.type(inputSearch, 'hello');
    const btnBuscar = screen.getByTestId('exec-search-btn');
    userEvent.click(btnBuscar);
    global.alert = jest.fn()
      .mockReturnValue(alert);
  });
});

describe('Drinks', () => {
  it('Verifica a tela Drinks há 12 cards', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Drinks />
      </RecipesProvider>,
    );

    const cards = await screen.findAllByTestId(/recipe-card/i);

    expect(cards.length).toEqual(TWELVE);
  });

  it('Verifica se ao clicar na receita encaminha para details recipeDrinks', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Drinks />
      </RecipesProvider>,
    );
    const firstRecipe = await screen.findByTestId('0-card-img');
    expect(firstRecipe).toBeInTheDocument();
    userEvent.click(firstRecipe);

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

  it('Verifica a tela Drinks aparece mensagem de receita não encontrada', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Drinks />
      </RecipesProvider>,
    );

    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const name = screen.getByLabelText('Name');
    userEvent.click(name);
    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'hello');
    const btnBuscar = screen.getByTestId('exec-search-btn');
    userEvent.click(btnBuscar);
    global.alert = jest.fn()
      .mockReturnValue(alert);
  });
});
