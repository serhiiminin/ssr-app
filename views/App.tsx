import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { NotFoundPage } from './pages/404';
import { Routes, RoutesPaths } from '../routes';

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

export const App: React.FC<AppProps> = ({ routes }) => (
  <ThemeProvider theme={{ mode: 'light' }}>
    <GlobalStyle />
    <Switch>
      <Route
        path={RoutesPaths.INDEX}
        exact={routes[RoutesPaths.INDEX].exact}
        component={routes[RoutesPaths.INDEX].component}
      />
      <Route
        path={RoutesPaths.POSTS}
        exact={routes[RoutesPaths.POSTS].exact}
        component={routes[RoutesPaths.POSTS].component}
      />
      <Route path="/about" exact render={() => '/about'} />
      <Route component={NotFoundPage} />
    </Switch>
    <S>hello</S>
  </ThemeProvider>
);
