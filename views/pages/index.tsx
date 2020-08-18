import React, { useState } from 'react';
import Helmet from 'react-helmet';

export const IndexPage: React.FC = () => {
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
