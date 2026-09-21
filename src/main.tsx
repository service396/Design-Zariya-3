import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { Deck } from './deck/Deck';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Deck />
  </React.StrictMode>
);
