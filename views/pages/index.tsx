import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';

export interface IndexPageProps {
  data?: string;
}

export const initialFetchData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('index bla bla');
    }, 1000);
  });
};

export const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const [d, setD] = useState<string | undefined>(data);
  useEffect(() => {
    const fetch = async () => {
      const da = await initialFetchData();
      setD(da);
    };
    if (!data) {
      fetch();
    }
  }, []);
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
        {d}
        Index page
        {count}
      </div>
    </>
  );
};
