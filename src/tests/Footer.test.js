import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Footer from '../components/Footer';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Footer', () => {
  it('Verifica se existe um footer', () => {
    renderWithRouter(<Footer />);
    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
  });

  it('Verifica se o footer contém 3 ícones (drinks, explore e foods)', () => {
    renderWithRouter(<Footer />);
    const drinks = screen.getByRole('img', { name: /drink icon/i });
    const explore = screen.getByRole('img', { name: /explore icon/i });
    const food = screen.getByRole('img', { name: /meal icon/i });

    expect(drinks).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(food).toBeInTheDocument();
  });

  it('Verifica se ao clicar nos ícones a página é redirecionada corretamente', () => {
    const { history } = renderWithRouter(<Footer />);

    const drinks = screen.getByRole('img', { name: /drink icon/i });
    const explore = screen.getByRole('img', { name: /explore icon/i });
    const food = screen.getByRole('img', { name: /meal icon/i });

    userEvent.click(drinks);
    expect(history.location.pathname).toBe('/drinks');

    userEvent.click(explore);
    expect(history.location.pathname).toBe('/explore');

    userEvent.click(food);
    expect(history.location.pathname).toBe('/foods');
  });

  it('Verifica se o Footer é renderizado nas páginas corretas', () => {
    cleanup();
    const { history } = renderWithRouter(<Footer />);

    const validPaths = ['/foods', '/drinks', '/explore', '/profile',
      '/explore/foods', '/explore/drinks', '/explore/foods/ingredients',
      '/explore/drinks/ingredients', '/explore/foods/nationalities',
      '/explore/drinks/nationalities'];

    const footer = screen.getByTestId('footer');

    validPaths.forEach((path) => {
      history.push(path);

      expect(footer).toBeInTheDocument();
    });
  });

  // it('Verifica se o Footer não é renderizado nas rotas específicas', () => {
  //   const invalidPaths = ['/', '/foods/{id-da-receita}', '/drinks/{id-da-receita}',
  //     '/foods/{id-da-receita}/in-progress', '/drinks/{id-da-receita}/in-progress',
  //     '/done-recipes', '/favorite-recipes'];

  //   invalidPaths.forEach((path) => {
  //     cleanup();
  //     const { history } = renderWithRouter(<Footer />);
  //     const footer = screen.getByTestId('footer');
  //     history.push(path);

  //     expect(footer).not.toBeInTheDocument();
  //   });
  // });
});
