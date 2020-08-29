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

// @ts-ignore
const RouteWrapper = ({ path, routes }) => {
  console.log(path, routes);
  return (
    <Route
      path={path}
      exact={routes[path].exact}
      component={(props: any) =>
        React.createElement(routes[path].component, {
          ...props,
          data: routes[path].data,
          error: routes[path].data,
        })}
    />
  );
};

export const App: React.FC<AppProps> = ({ routes }) => (
  <ThemeProvider theme={{ mode: 'light' }}>
    <GlobalStyle />
    <Switch>
      {/*<RouteWrapper path={RoutesPaths.POSTS} routes={routes} />*/}
      {/*<RouteWrapper path={RoutesPaths.INDEX} routes={routes} />*/}
      <Route path="/posts" exact render={() => <div>{routes['/posts'].data}</div>} />
      <Route component={NotFoundPage} />
    </Switch>
    <S>hello</S>
  </ThemeProvider>
);
