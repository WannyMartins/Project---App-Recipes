import { screen } from '@testing-library/react';
import React from 'react';
// import FoodsList from '../components/FoodsList';
import RecipesProvider from '../context/recipesProvider';
import renderWithRouter from '../helpers/renderWithRouter';
import Foods from '../pages/foods/Foods';

const TWELVE = 12;

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
});
