import React, { createContext } from 'react';
import { Switch } from 'react-router-dom';
import { DataProps } from '../../routes';

export const RouterDataContext = createContext<DataProps | null>(null);

export const SwitchWithData: React.FC<DataProps> = ({ data, children }) => (
  <RouterDataContext.Provider value={{ data }}>
    <Switch>{children}</Switch>
  </RouterDataContext.Provider>
);
