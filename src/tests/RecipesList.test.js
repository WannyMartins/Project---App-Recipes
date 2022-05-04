import { screen } from '@testing-library/react';
import React from 'react';
import meals from '../../cypress/mocks/meals';
import FoodCard from '../components/FoodCard';
import FoodsList from '../components/FoodsList';
// import FoodsList from '../components/FoodsList';
// import FoodsList from '../components/FoodsList';
import RecipesProvider from '../context/recipesProvider';
import renderWithRouter from '../helpers/renderWithRouter';
import Foods from '../pages/foods/Foods';

// const TWELVE = 12;

describe('Foods', () => {
  it('Verifica a tela Foods', () => {
    renderWithRouter(
      <RecipesProvider>
        <Foods>
          <FoodsList meals={ meals }>
            <FoodCard />
          </FoodsList>
        </Foods>
      </RecipesProvider>,
    );
    screen.queryAllByText(/foods/i);
  });
});
