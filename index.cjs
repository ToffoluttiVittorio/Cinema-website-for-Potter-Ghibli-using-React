const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter: Router, Route, Routes } = require('react-router-dom');
require('./index.css');
const App = require('./App.js');
const reportWebVitals = require('./reportWebVitals');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  React.createElement(React.StrictMode, null,
    React.createElement(Router, null,
      React.createElement(Routes, null,
        React.createElement(Route, { path: "*", element: React.createElement(App, null) })
      )
    )
  )
);

reportWebVitals();
