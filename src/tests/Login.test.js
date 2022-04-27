import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const emailInput = 'email-input';
const passwordInput = 'password-input';
const loginSubmitButton = 'login-submit-btn';

describe('Tela de Login', () => {
  it('Verifica os data-testids email-input, password-input e login-submit-btn', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const submitButton = screen.getByTestId(loginSubmitButton);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('Verifica se a pessoa usuária consigue escrever seu email no input', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId(emailInput);
    const userEmail = 'email@mail.com';

    userEvent.type(email, userEmail);
    expect(email).toHaveValue(userEmail);
  });

  it('Verifica se a pessoa usuária consigue escrever sua senha no input', () => {
    renderWithRouter(<App />);
    const password = screen.getByTestId(passwordInput);
    const userPassword = '1234567';

    userEvent.type(password, userPassword);
    expect(password).toHaveValue(userPassword);
  });
});
