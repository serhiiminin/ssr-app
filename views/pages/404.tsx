import React from 'react';
import Helmet from 'react-helmet';

export const NotFoundPage: React.FC = () => (
  <>
    <Helmet>
      <title>Not Found</title>
      <meta name="description" content="not found page" />
    </Helmet>
    <div>Not found</div>
  </>
);
