import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { NotFoundPage } from './pages/404';
import { Routes } from '../routes';
import { IndexPage } from './pages';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

const S = styled.div`
  background: black;
  color: white;
`;

export interface AppProps {
  routes: Routes;
}

const Bla = () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(6);
    }, 1000);
  });
  // throw promise;

  return <div>bla</div>;
};

Bla.fetchData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('bla');
    }, 1000);
  });

export const App: React.FC<AppProps> = ({ routes }) => (
  <ThemeProvider theme={{ mode: 'light' }}>
    <GlobalStyle />
    <Switch>
      <Route path="/" exact component={IndexPage} />
      <Route path="/ton" exact component={Bla} />
      <Route path="/posts" exact render={() => <div>{routes['/posts'].data}</div>} />
      <Route component={NotFoundPage} />
    </Switch>
    <S>hello</S>
  </ThemeProvider>
);
