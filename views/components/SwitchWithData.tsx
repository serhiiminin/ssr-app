import React, { createContext, ReactNode } from 'react';
import { Switch } from 'react-router-dom';
import { DataProps, DataRouteProps } from '../../routes';

export const RouterDataContext = createContext<DataRouteProps | undefined>(undefined);

export interface SwitchWithDataProps extends DataProps {
  children: ReactNode;
}

export const SwitchWithData: React.FC<SwitchWithDataProps> = ({ data, children }) => (
  <RouterDataContext.Provider value={data}>
    <Switch>{children}</Switch>
  </RouterDataContext.Provider>
);
