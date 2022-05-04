import { screen } from '@testing-library/react';
import React from 'react';
import meals from '../../cypress/mocks/meals';
// import FoodsList from '../components/FoodsList';
// import FoodsList from '../components/FoodsList';
import RecipesProvider from '../context/recipesProvider';
import renderWithRouter from '../helpers/renderWithRouter';
import Foods from '../pages/foods/Foods';

afterEach(() => jest.clearAllMocks());

// const TWELVE = 12;

describe('Foods', () => {
  it('Verifica a tela Foods', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    renderWithRouter(
      <RecipesProvider>
        <Foods />
      </RecipesProvider>,
    );

    const firstCard = screen.queryAllByTestId('0-recipe-card');

    expect(firstCard).toBeDefined();
    // screen.findByTestId('1-recipe-card');
    // screen.findByTestId('2-recipe-card');
    // screen.findByTestId('3-recipe-card');
    // screen.findByTestId('4-recipe-card');
    // screen.findByTestId('5-recipe-card');
    // screen.findByTestId('6-recipe-card');
    // screen.findByTestId('7-recipe-card');
    // screen.findByTestId('8-recipe-card');
    // screen.findByTestId('9-recipe-card');
    // screen.findByTestId('10-recipe-card');
    // screen.findByTestId('11-recipe-card');
    // expect(screen.findByTestId('12-recipe-card')).toBeUndefined();
  });
});
