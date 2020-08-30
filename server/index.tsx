import path from 'path';
import fs from 'fs';
import util from 'util';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import ssrPrepass from 'react-ssr-prepass';
import serialize from 'serialize-javascript';

import { App } from '../views/App';
import { fetchInitialData } from '../routes';

const readFile = util.promisify(fs.readFile);

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static('./build-client'));

app.get('/*', async (req, res) => {
  const routesWithData = await fetchInitialData(req.url);
  const sheet = new ServerStyleSheet();
  const context = {};

  try {
    const element = (
      <StyleSheetManager sheet={sheet.instance}>
        <StaticRouter location={req.url} context={context}>
          <App routes={routesWithData} />
        </StaticRouter>
      </StyleSheetManager>
    );
    await ssrPrepass(element);
    const markup = ReactDOMServer.renderToString(element);
    const styleTags = sheet.getStyleTags();
    const helmetData = Helmet.renderStatic();

    const indexFile = path.resolve('./build-client/main.html');
    const indexTemplate = await readFile(indexFile, 'utf8');

    return res.send(
      indexTemplate.replace('<div id="root"></div>', `<div id="root">${markup}</div>`).replace(
        '</head>',
        `${helmetData.title.toString()}${helmetData.meta.toString()}${styleTags}
            </head>
            <script>
                window.GLOBAL_DATA = ${serialize(routesWithData)}
            </script>`
      )
    );
  } catch (error) {
    return res.status(500).send('Oops, better luck next time!');
  } finally {
    sheet.seal();
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${PORT}`);
});
