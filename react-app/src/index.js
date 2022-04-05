import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from "./context/modal";
const store = configureStore();


function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Root/>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
