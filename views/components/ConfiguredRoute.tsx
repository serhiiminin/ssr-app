import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { DataProps, routes, RoutesPaths } from '../../routes';
import { RouterDataContext } from './SwitchWithData';

export interface ConfiguredRouteProps {
  path: RoutesPaths;
}

export const ConfiguredRoute: React.FC<ConfiguredRouteProps> = ({ path }) => {
  const contextData = useContext<DataProps | null>(RouterDataContext);
  const routeConfig = routes[path];
  const RouteCmp = routeConfig.component;
  const routeData = contextData && contextData.data && contextData.data[routeConfig.path];

  return <Route path={routeConfig.path} exact={routeConfig.exact} render={() => <RouteCmp data={routeData} />} />;
};
