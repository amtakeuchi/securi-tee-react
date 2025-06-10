import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';

// Ensure React and hooks are available globally
const {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useRef,
  useReducer,
  useLayoutEffect
} = React;

window.React = React;
window.useState = useState;
window.useEffect = useEffect;
window.useContext = useContext;
window.useCallback = useCallback;
window.useMemo = useMemo;
window.useRef = useRef;
window.useReducer = useReducer;
window.useLayoutEffect = useLayoutEffect;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
