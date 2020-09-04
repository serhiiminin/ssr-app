import { ComponentType } from 'react';
import { IndexPage, initialFetchData as initialFetchDataIndex } from '../views/pages';

export enum RoutesPaths {
  INDEX = '/',
  POSTS = '/posts',
  POSTS_READ = '/posts/:id',
  POSTS_EDIT = '/posts/:id/edit',
}

export type InitialDataFetch = () => Promise<any>;

export type DataRouteProps = {
  [key in RoutesPaths]?: any;
};

export interface DataProps {
  data?: DataRouteProps;
}

export interface RouteConfig {
  path: RoutesPaths;
  exact: boolean;
  component: ComponentType<DataProps>;
  initialDataFetch?: InitialDataFetch;
}

export type Routes = {
  [key in RoutesPaths]: RouteConfig;
};

export const routes: Routes = {
  [RoutesPaths.INDEX]: {
    path: RoutesPaths.INDEX,
    component: IndexPage,
    exact: true,
    initialDataFetch: initialFetchDataIndex,
  },
  [RoutesPaths.POSTS]: {
    path: RoutesPaths.POSTS,
    component: IndexPage,
    exact: true,
    initialDataFetch: initialFetchDataIndex,
  },
  [RoutesPaths.POSTS_READ]: {
    path: RoutesPaths.POSTS_READ,
    exact: true,
    component: IndexPage,
    initialDataFetch: initialFetchDataIndex,
  },
  [RoutesPaths.POSTS_EDIT]: {
    path: RoutesPaths.POSTS_EDIT,
    exact: true,
    component: IndexPage,
    initialDataFetch: initialFetchDataIndex,
  },
};
