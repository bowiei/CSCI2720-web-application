import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';

const root = ReactDOM.createRoot(document.querySelector("#header"));
root.render(<Header name="Project"/>);