import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { DataRouteProps, routes, RoutesPaths } from '../../routes';
import { RouterDataContext } from './SwitchWithData';

export interface RouteWithDataProps {
  path: RoutesPaths;
}

export const RouteWithData: React.FC<RouteWithDataProps> = ({ path }) => {
  const contextData = useContext<DataRouteProps | undefined>(RouterDataContext);
  const routeConfig = routes[path];
  const RouteCmp = routeConfig.component;
  const routeData = contextData && contextData[routeConfig.path];

  return <Route path={routeConfig.path} exact={routeConfig.exact} render={() => <RouteCmp data={routeData} />} />;
};
