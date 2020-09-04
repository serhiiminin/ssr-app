import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from '../views/App';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const data = window.GLOBAL_DATA;

ReactDOM.hydrate(
  <React.StrictMode>
    <BrowserRouter>
      <App data={data} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
