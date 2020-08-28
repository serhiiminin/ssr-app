import { matchPath } from 'react-router-dom';
import { routes, Routes, RoutesPaths, InitialDataFetch } from './routes';

export type MatchedRoutes = {
  [key in RoutesPaths]: InitialDataFetch;
};

export interface FetchWithPathWrapper {
  path: string;
  data?: any;
  error?: any;
}

const fetchWithPathWrapper = (path: RoutesPaths, fetcher: InitialDataFetch): Promise<FetchWithPathWrapper> =>
  fetcher()
    .then((data) => ({ path, data }))
    .catch((error) => ({ path, error }));

const getMatchedRoutesWithFetchers = (currentRoute: string, routesConfig: Routes): MatchedRoutes =>
  Object.entries(routesConfig).reduce((acc, [path, pathParams]) => {
    const matchedParams = matchPath(currentRoute, { path, exact: pathParams.exact });
    if (matchedParams && pathParams.initialDataFetch) {
      return { ...acc, [path]: pathParams.initialDataFetch };
    }

    return acc;
  }, {} as MatchedRoutes);

const populateRoutesConfigWithData = (
  settledData: PromiseFulfilledResult<FetchWithPathWrapper>[],
  routesList: Routes
) =>
  settledData.reduce((acc, route) => {
    const { error, data } = route.value;
    const path = route.value.path as RoutesPaths;
    return {
      ...routesList,
      [path]: {
        ...routesList[path],
        data,
        error,
      },
    };
  }, routesList);

export type Fetch = (currentRoute: string) => Promise<Routes>;

export const createFetchInitialData = (routesConfig: Routes): Fetch => async (currentRoute: string) => {
  try {
    const matchedRoutes = Object.entries(getMatchedRoutesWithFetchers(currentRoute, routesConfig)) as [
      RoutesPaths,
      InitialDataFetch
    ][];
    const settledData = (await Promise.allSettled(
      matchedRoutes.map(([path, fetcher]) => fetchWithPathWrapper(path, fetcher))
    )) as PromiseFulfilledResult<FetchWithPathWrapper>[];
    return populateRoutesConfigWithData(settledData, routesConfig);
  } catch (error) {
    return routesConfig;
  }
};

export const fetchInitialData = createFetchInitialData(routes);
