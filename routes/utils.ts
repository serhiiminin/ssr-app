import { matchPath } from 'react-router-dom';
import { routes, Routes, RouteConfig, DataRouteProps } from './routes';

export const createGetterRouteConfig = (routesConfig: Routes) => (currentRoute: string): RouteConfig | undefined => {
  const foundRoute = Object.entries(routesConfig).find(([path, pathParams]) =>
    matchPath(currentRoute, {
      path,
      exact: pathParams.exact,
    })
  );

  return foundRoute && foundRoute[1];
};

export const fetchData = async (routeConfig?: RouteConfig): Promise<DataRouteProps | undefined> => {
  if (routeConfig && routeConfig.initialDataFetch) {
    const data = await routeConfig.initialDataFetch();
    return {
      [routeConfig.path]: data,
    };
  }
  return undefined;
};

export const getRouteConfig = createGetterRouteConfig(routes);
