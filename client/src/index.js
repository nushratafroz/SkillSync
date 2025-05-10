import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global CSS Imports
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/scrolling-nav.css';
import './assets/css/style.css';

// Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);