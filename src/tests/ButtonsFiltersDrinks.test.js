import { screen } from '@testing-library/react';
import React from 'react';
import RecipesProvider from '../context/recipesProvider';
import renderWithRouter from '../helpers/renderWithRouter';
import Drinks from '../pages/drinks/Drinks';

describe('ButtonsFilterDrinks', () => {
  it('Verifica a tela Drinks há 6 Buttons', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Drinks />
      </RecipesProvider>,
    );

    const buttonCocktail = await screen.findByText(/cocktail/i);
    expect(buttonCocktail).toBeDefined();
    const buttonOrdinaryDrink = await screen.findByText(/Ordinary Drink/i);
    expect(buttonOrdinaryDrink).toBeDefined();
    const buttonShake = await screen.findByText(/Shake/i);
    expect(buttonShake).toBeDefined();
    const buttonOther = await screen.findByText(/Other/i);
    expect(buttonOther).toBeDefined();
    const buttonCocoa = await screen.findByText(/Cocoa/i);
    expect(buttonCocoa).toBeDefined();
    const buttonAll = await screen.findByText(/All/i);
    expect(buttonAll).toBeDefined();
  });
});
