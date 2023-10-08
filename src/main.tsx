import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const root = createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

//TODO: https://developer.chrome.com/blog/css-color-mix/ 'CSS color-mix()'
//TODO: parse pasted gradients, patterns
