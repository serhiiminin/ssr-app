import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { NotFoundPage } from './pages/404';
import { DataProps, routes, RoutesPaths } from '../routes';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

const S = styled.div`
  background: black;
  color: white;
`;

export interface ConfiguredRouteProps extends DataProps {
  path: RoutesPaths;
}

const ConfiguredRoute = ({ path, data }: ConfiguredRouteProps) => {
  const routeConfig = routes[path];
  const RouteCmp = routeConfig.component;
  const routeData = data && data[routeConfig.path];

  return <Route path={routeConfig.path} exact={routeConfig.exact} render={() => <RouteCmp data={routeData} />} />;
};

export const App: React.FC<DataProps> = ({ data }) => (
  <ThemeProvider theme={{ mode: 'light' }}>
    <GlobalStyle />
    <Switch>
      <ConfiguredRoute path={RoutesPaths.INDEX} data={data} />
      <ConfiguredRoute path={RoutesPaths.POSTS} data={data} />
      <ConfiguredRoute path={RoutesPaths.POSTS_EDIT} data={data} />
      <ConfiguredRoute path={RoutesPaths.POSTS_READ} data={data} />
      <Route component={NotFoundPage} />
    </Switch>
    <S>hello</S>
  </ThemeProvider>
);
