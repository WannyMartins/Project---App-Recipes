import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import React from 'react';
import RecipesProvider from '../context/recipesProvider';
import renderWithRouter from '../helpers/renderWithRouter';
import Foods from '../pages/foods/Foods';

describe('Header na tela Principal', () => {
  it('Tem os data-testids profile-top-btn, page-title e search-top-btn', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Foods />
      </RecipesProvider>,
    );
    const profileBtn = screen.getByTestId('profile-top-btn');
    const title = screen.getByTestId('page-title');
    const searchBtnOn = screen.getByAltText('search');

    expect(profileBtn).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(searchBtnOn).toBeInTheDocument();

    userEvent.click(profileBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/profile');
  });

  it('o input de busca aparece e some ao clicar no botão `search`', () => {
    renderWithRouter(
      <RecipesProvider>
        <Foods />
      </RecipesProvider>,
    );

    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const inputSearch = screen.getByTestId('search-input');
    userEvent.click(searchBtn);
    expect(inputSearch).not.toBeInTheDocument();
  });

  it('É possivel pesquisar no input search', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Foods />
      </RecipesProvider>,
    );
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);
    const inputSearch = screen.getByTestId('search-input');
    fireEvent.change(inputSearch, { target: { value: 'a' } });
    expect(inputSearch.value).toBe('a');

    screen.getByLabelText('Ingredient');
    const name = screen.getByLabelText('Name');
    const firstLetter = screen.getByLabelText('First Letter');

    const btnBuscar = screen.getByTestId('exec-search-btn');
    fireEvent.change(inputSearch, { target: { value: 'egg' } });
    userEvent.click(name);
    userEvent.click(btnBuscar);
    expect(screen.findAllByTestId('0-recipe-card')).toBeDefined();

    userEvent.click(firstLetter);
    fireEvent.change(inputSearch, { target: { value: 'aa' } });
    global.alert = jest.fn()
      .mockReturnValue('Your search must have only 1 (one) character');
  });
});
