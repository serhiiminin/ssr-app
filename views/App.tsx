import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { NotFoundPage } from './pages/404';
import { DataProps, RoutesPaths } from '../routes';
import { RouteWithData } from './components/RouteWithData';
import { SwitchWithData } from './components/SwitchWithData';

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
    <SwitchWithData data={data}>
      <RouteWithData path={RoutesPaths.INDEX} />
      <RouteWithData path={RoutesPaths.POSTS} />
      <RouteWithData path={RoutesPaths.POSTS_EDIT} />
      <RouteWithData path={RoutesPaths.POSTS_READ} />
      <Route component={NotFoundPage} />
    </SwitchWithData>
    <StyledDiv>hello</StyledDiv>
  </ThemeProvider>
);
