import React, { useState } from 'react';
import Buttons from '../components/Buttons';
import styles from '../styles/Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleButton = () => {
    const regex = /\S+@\S+\.\S+/;
    const maxLength = 5;
    if (regex.test(email) && password.length > maxLength) {
      setDisabled(false);
    } else setDisabled(true);
  };

  return (
    <main className={ styles.container }>
      <section className={ styles.wrapper }>
        <label htmlFor="email-input" className={ styles.label }>
          <p>Email</p>
          <input
            type="email"
            id="email-input"
            value={ email }
            onChange={ (e) => setEmail(() => hadleButton(), e.target.value) }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password-input" className={ styles.label }>
          <p>Senha</p>
          <input
            type="password"
            id="password-input"
            name="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            data-testid="password-input"
          />
        </label>
        <div className={ styles.label }>
          <Buttons
            text="Enter"
            dataTestId="login-submit-btn"
            onClick={ () => {} }
            disabled={ disabled }
          />
        </div>
      </section>
    </main>
  );
}

export default Login;
