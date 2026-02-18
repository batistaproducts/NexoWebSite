
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Antonio Batista - Projeto: MVP Nexo Institucional - "Ponto de entrada do sistema: Inicialização do Virtual DOM e renderização do App"
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
