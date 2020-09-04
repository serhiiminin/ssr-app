import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { NotFoundPage } from './pages/404';
import { DataProps, RoutesPaths } from '../routes';
import { ConfiguredRoute } from './components/ConfiguredRoute';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

const StyledDiv = styled.div`
  background: black;
  color: white;
`;

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
    <StyledDiv>hello</StyledDiv>
  </ThemeProvider>
);
