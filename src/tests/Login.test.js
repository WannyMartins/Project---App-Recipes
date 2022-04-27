import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const emailInput = 'email-input';
const passwordInput = 'password-input';
const loginSubmitButton = 'login-submit-btn';
const userEmail = 'email@mail.com';
const userPassword = '1234567';

describe('Tela de Login', () => {
  it('2- Verifica os data-testids email-input, password-input e login-submit-btn', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const submitButton = screen.getByTestId(loginSubmitButton);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('3- Verifica se a pessoa usuária consegue escrever seu email no input', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(emailInput);

    userEvent.type(email, userEmail);
    expect(email).toHaveValue(userEmail);
  });

  it('4- Verifica se a pessoa usuária consegue escrever sua senha no input', () => {
    renderWithRouter(<App />);
    const password = screen.getByTestId(passwordInput);

    userEvent.type(password, userPassword);
    expect(password).toHaveValue(userPassword);
  });

  it.skip('5- Verifica se ', () => {

  });

  it('6- Verifica se mealsToken e cocktailsToken estão salvos no localStorage', () => {
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

  it.skip('7- Verifica se ', () => {
    renderWithRouter(<App />);
    localStorage.clear();
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const submitButton = screen.getByTestId(loginSubmitButton);
    const user = localStorage.getItem('user');
    const object = JSON.parse(user);

    userEvent.type(email, userEmail);
    userEvent.type(password, userPassword);
    userEvent.click(submitButton);

    expect(object).toBeEqual({ email: userEmail });
  });

  it.skip('8- Verifica se ', () => {});
});
