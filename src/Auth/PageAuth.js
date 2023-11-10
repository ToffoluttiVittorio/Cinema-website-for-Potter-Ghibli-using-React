import React from 'react';
import "../Composants_page/Bandeau.css"
import LoginForm from './LoginForm.js';
import './PageAuth.css'

/**
 * The PageAuth function returns a div element containing a LoginForm component.
 * @returns The PageAuth component is returning a div element with the className "PageAuth" and a
 * LoginForm component inside it.
 */
function PageAuth() {
  return (
    <div className="PageAuth">
      <LoginForm/>
    </div>
  );
}

export default PageAuth;
