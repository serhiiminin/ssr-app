import React, { useState } from "react";
import Helmet from "react-helmet";

export const IndexPage = () => {
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
      <button onClick={onClick}>Save</button>
      <div>Index page {count}</div>
    </>
  );
};
