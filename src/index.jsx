import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from './app.jsx';

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App name="Admin Page"/>);