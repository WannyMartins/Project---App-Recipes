import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const emailInput = 'email-input';
const passwordInput = 'password-input';
const loginSubmitButton = 'login-submit-btn';
const userEmail = 'email@mail.com';
const userPassword = '1234567';

describe('Tela de Login', () => {
  it('Verifica se existe campos de senha, email e botão de login', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const submitButton = screen.getByTestId(loginSubmitButton);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('Verifica se a pessoa usuária consegue escrever seu email no input', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(emailInput);

    userEvent.type(email, userEmail);
    expect(email).toHaveValue(userEmail);
  });

  it('Verifica se a pessoa usuária consegue escrever sua senha no input', () => {
    renderWithRouter(<App />);
    const password = screen.getByTestId(passwordInput);

    userEvent.type(password, userPassword);
    expect(password).toHaveValue(userPassword);
  });

  it('Verifica se mealsToken e cocktailsToken estão salvos no localStorage', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const submitButton = screen.getByTestId(loginSubmitButton);

    userEvent.type(email, userEmail);
    userEvent.type(password, userPassword);
    userEvent.click(submitButton);

    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');

    expect(mealsToken).toBe('1');
    expect(cocktailsToken).toBe('1');
  });
});
