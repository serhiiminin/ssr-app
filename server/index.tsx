import path from 'path';
import fs from 'fs';
import util from 'util';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import { App } from '../views/App';

const readFile = util.promisify(fs.readFile);

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static('./build-client'));

app.get('/*', async (req, res) => {
  const sheet = new ServerStyleSheet();
  const context = {} as any;
  try {
    const markup = ReactDOMServer.renderToString(
      <StyleSheetManager sheet={sheet.instance}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </StyleSheetManager>
    );
    const styleTags = sheet.getStyleTags();
    const helmetData = Helmet.renderStatic();

    const indexFile = path.resolve('./build-client/main.html');
    const data = await readFile(indexFile, 'utf8');

    return res.send(
      data
        .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
        .replace('</head>', `${helmetData.title.toString()}${helmetData.meta.toString()}${styleTags}</head>`)
    );
  } catch (error) {
    res.status(500).send('Oops, better luck next time!');
  } finally {
    sheet.seal();
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
