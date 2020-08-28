import { ComponentType } from 'react';
import { IndexPage, initialFetchData as initialFetchDataIndex } from '../views/pages';

export enum RoutesPaths {
  INDEX = '/',
  POSTS = '/posts',
  POSTS_READ = '/posts/:id',
  POSTS_EDIT = '/posts/:id/edit',
}

export type InitialDataFetch = () => Promise<any>;

export type Routes = {
  [key in RoutesPaths]: {
    exact: boolean;
    component: ComponentType;
    initialDataFetch?: InitialDataFetch;
    data?: any;
    error?: any;
  };
};

export const routes: Routes = {
  [RoutesPaths.INDEX]: {
    component: IndexPage,
    exact: true,
    initialDataFetch: initialFetchDataIndex,
  },
  [RoutesPaths.POSTS]: {
    component: IndexPage,
    exact: true,
    initialDataFetch: initialFetchDataIndex,
  },
  [RoutesPaths.POSTS_READ]: {
    exact: true,
    component: IndexPage,
    initialDataFetch: initialFetchDataIndex,
  },
  [RoutesPaths.POSTS_EDIT]: {
    exact: true,
    component: IndexPage,
    initialDataFetch: initialFetchDataIndex,
  },
};
