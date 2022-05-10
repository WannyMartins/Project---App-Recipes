import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../pages/NotFound';

describe('NotFound', () => {
  it('Verifica se existe o texto "Not Found" na tela', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/qualquer-coisa');

    const notFound = screen.getByText(/not found/i);

    expect(notFound).toBeInTheDocument();
  });
});
