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
  settledData.reduce((acc, key) => {
    const { error, data } = key.value;
    const path = key.value.path as RoutesPaths;
    return {
      ...routesList,
      [path]: {
        ...routesList[path],
        data,
        error,
      },
    };
  }, routesList);

export type Fetch = (currentRoute: string) => Promise<Routes | undefined>;

export const createFetchInitialData = (routesList: Routes): Fetch => async (currentRoute: string) => {
  try {
    const matchedRoutes = Object.entries(getMatchedRoutesWithFetchers(currentRoute, routesList)) as [
      RoutesPaths,
      InitialDataFetch
    ][];
    const settledData = (await Promise.allSettled(
      matchedRoutes.map(([path, fetcher]) => fetchWithPathWrapper(path, fetcher))
    )) as PromiseFulfilledResult<FetchWithPathWrapper>[];
    return populateRoutesConfigWithData(settledData, routes);
  } catch (error) {
    return undefined;
  }
};

export const fetchInitialData = createFetchInitialData(routes);
