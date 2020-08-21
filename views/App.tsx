import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { IndexPage } from './pages';
import { NotFoundPage } from './pages/404';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

const S = styled.div`
  background: black;
  color: white;
`;

export const App: React.FC = () => (
  <ThemeProvider theme={{ mode: 'light' }}>
    <GlobalStyle />
    <Switch>
      <Route path="/" exact component={IndexPage} />
      <Route path="/about" exact render={() => '/about'} />
      <Route component={NotFoundPage} />
    </Switch>
    <S>hello</S>
  </ThemeProvider>
);
