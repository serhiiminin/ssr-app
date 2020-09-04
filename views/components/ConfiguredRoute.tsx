import { Route } from 'react-router-dom';
import React from 'react';
import { DataProps, routes, RoutesPaths } from '../../routes';

export interface ConfiguredRouteProps extends DataProps {
  path: RoutesPaths;
}

export const ConfiguredRoute: React.FC<ConfiguredRouteProps> = ({ path, data }) => {
  const routeConfig = routes[path];
  const RouteCmp = routeConfig.component;
  const routeData = data && data[routeConfig.path];

  return <Route path={routeConfig.path} exact={routeConfig.exact} render={() => <RouteCmp data={routeData} />} />;
};
