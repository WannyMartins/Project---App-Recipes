import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Profile', () => {
  it('Verifica se os elementos corretos são renderizado na tela', () => {
    const { history } = renderWithRouter(<Profile />);
    history.push('/profile');

    const profile = screen.getByTestId('page-title');
    const email = screen.getByTestId('profile-email');
    const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });
    const favoriteRecipesBtn = screen.getByRole('button', { name: /favorite recipes/i });
    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    expect(profile).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favoriteRecipesBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  it('Verifica se o botão "done recipes" tem o comportamento esperado', () => {
    const { history } = renderWithRouter(<Profile />);
    history.push('/profile');

    const doneRecipesBtn = screen.getByRole('button', { name: /done recipes/i });

    userEvent.click(doneRecipesBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Verifica se o botão "favorite recipes" tem o comportamento esperado', () => {
    const { history } = renderWithRouter(<Profile />);
    history.push('/profile');

    const favoriteRecipesBtn = screen.getByRole('button', { name: /favorite recipes/i });

    userEvent.click(favoriteRecipesBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Verifica se o botão "logout" tem o comportamento esperado', () => {
    const { history } = renderWithRouter(<Profile />);
    history.push('/profile');

    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });
});
