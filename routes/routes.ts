import { ComponentType } from 'react';
import { IndexPage, initialFetchData as initialFetchDataIndex } from '../views/pages';

enum RoutesList {
  INDEX = '/',
  POSTS = '/posts',
  POSTS_READ = '/posts/:id',
  POSTS_EDIT = '/posts/:id/edit',
}

interface Routes {
  [key: string]: {
    path: RoutesList;
    component: ComponentType;
    exact: boolean;
    initialDataFetch?: () => Promise<any>;
    data?: any;
    error?: any;
    children?: Routes;
  };
}

export const routes: Routes = {
  index: {
    path: RoutesList.INDEX,
    component: IndexPage,
    exact: true,
    initialDataFetch: initialFetchDataIndex,
  },
  posts: {
    path: RoutesList.POSTS,
    component: IndexPage,
    exact: true,
    initialDataFetch: initialFetchDataIndex,
    children: {
      read: {
        path: RoutesList.POSTS_READ,
        exact: true,
        component: IndexPage,
        initialDataFetch: initialFetchDataIndex,
      },
      edit: {
        path: RoutesList.POSTS_EDIT,
        exact: true,
        component: IndexPage,
        initialDataFetch: initialFetchDataIndex,
      },
    },
  },
};
