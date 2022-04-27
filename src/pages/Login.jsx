import React, { useState } from 'react';
import { isEmail } from 'validator';
import { useHistory } from 'react-router';
import Buttons from '../components/Buttons';
import styles from '../styles/Login.module.css';

function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const { email, password } = login;
    setLogin((state) => ({ ...state, [name]: value }));
    const minLength = 6;
    const isEmailValid = isEmail(email);
    const isPasswordValid = password.length >= minLength;
    const enableBtn = isEmailValid && isPasswordValid;
    setDisabled(!enableBtn);
  };

  return (
    <main className={ styles.container }>
      <section className={ styles.wrapper }>
        <label htmlFor="email-input" className={ styles.label }>
          <p>Email</p>
          <input
            type="email"
            id="email-input"
            name="email"
            value={ login.email }
            onChange={ handleChange }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password-input" className={ styles.label }>
          <p>Senha</p>
          <input
            type="password"
            id="password-input"
            name="password"
            value={ login.password }
            onChange={ handleChange }
            data-testid="password-input"
          />
        </label>
        <div className={ styles.label }>
          <Buttons
            text="Enter"
            dataTestId="login-submit-btn"
            onClick={ () => history.push('/foods') }
            disabled={ disabled }
          />
        </div>
      </section>
    </main>
  );
}

export default Login;
