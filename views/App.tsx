import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset'
import { IndexPage } from './pages/index';

const GlobalStyle = createGlobalStyle`
  ${reset}
`

const S = styled.div`
  background: black;
  color: white;

`

export const App = () => (
  <ThemeProvider theme={{ mode: 'light' }}>
    <GlobalStyle/>
    <S>hello</S>
    <div><IndexPage/></div>
  </ThemeProvider>
);
