import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { DataProps } from '../../routes';

export type IndexPageProps = DataProps;

export const initialFetchData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('index bla bla');
    }, 1000);
  });
};

export const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const [count, setCount] = useState<number>(0);
  const onClick = () => {
    setCount((c: number) => c + 1);
  };

  return (
    <>
      <Helmet>
        <title>Index Page</title>
        <meta name="description" content="index page" />
      </Helmet>
      <button type="submit" onClick={onClick}>
        Save
      </button>
      <div>
        Index page
        {count}
      </div>
    </>
  );
};
