import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { NotFoundPage } from './pages/404';
import { DataProps, RoutesPaths } from '../routes';
import { ConfiguredRoute } from './components/ConfiguredRoute';
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
      <ConfiguredRoute path={RoutesPaths.INDEX} />
      <ConfiguredRoute path={RoutesPaths.POSTS} />
      <ConfiguredRoute path={RoutesPaths.POSTS_EDIT} />
      <ConfiguredRoute path={RoutesPaths.POSTS_READ} />
      <Route component={NotFoundPage} />
    </SwitchWithData>
    <StyledDiv>hello</StyledDiv>
  </ThemeProvider>
);
