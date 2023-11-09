import React, { useState } from 'react';
import Cookies from 'js-cookie';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // État pour gérer la redirection
  const [error, setError] = useState(null); // État pour gérer les erreurs

  const handleSubmit = async (e) => {
    e.preventDefault();

    Cookies.remove('user_email');

    // Créez un objet URLSearchParams pour les données du formulaire
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);

    // Envoyez les données au serveur Express en utilisant la méthode PUT
    const response = await fetch('http://localhost:8888/users', {
      method: 'PUT', // Utilisez la méthode PUT
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Spécifiez le type de contenu
      },
      body: formData.toString(), // Convertissez les données du formulaire en une chaîne
    });

    if (response.ok) {
      // L'utilisateur a été créé ou mis à jour avec succès (selon la sémantique de votre API)
      setIsSuccess(true); // Déclenche la redirection
    } else {
      // Erreur lors de la création ou de la mise à jour de l'utilisateur
      console.error('Erreur lors de la création ou de la mise à jour de l\'utilisateur');
      const data = await response.json();
      setError(data.message); // Définit l'erreur en fonction du message renvoyé
    }
  };

  // Redirigez l'utilisateur si isSuccess est vrai
  if (isSuccess) {
    Cookies.set('user_email', email, { expires: 1 });
    window.location.href = '/Home'; // Redirection vers la page souhaitée
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
