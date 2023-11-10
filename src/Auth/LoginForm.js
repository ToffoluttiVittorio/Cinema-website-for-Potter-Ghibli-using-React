import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './LoginForm.css';

/**
 * The `LoginForm` function is a React component that renders a login form and handles form submission.
 * @returns The `LoginForm` component is returning a JSX element that represents a login form.
 */
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); 
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    Cookies.remove('user_email');


    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch('http://localhost:8888/users', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
      body: formData.toString(), 
    });

    if (response.ok) {

      setIsSuccess(true); 
    } else {

      console.error('Erreur lors de la création ou de la mise à jour de l\'utilisateur');
      const data = await response.json();
      setError(data.message); 
    }
  };


  if (isSuccess) {
    Cookies.set('user_email', email, { expires: 1 });
    window.location.href = '/Home'; 
  }

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Connectez-vous</h2>
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-button">
          Valider
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
