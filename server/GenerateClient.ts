
import serialize from 'serialize-javascript';
import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { AppProps } from '../src/App';

const generateClient = <P>(
  App: React.ReactElement<P>,
  globalState: AppProps,
): Promise<string> => new Promise((resolve, reject) => {
  const app = ReactDOMServer.renderToString(App);

  const indexFile = path.resolve('./server/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    }
    const clientString = data
    .replace(
      '<div id="root"></div>', 
      `<div id="root">${app}</div>`,
    )
   .replace('<head>', `<head><script>window.__INITIAL_PROPS__ = ${serialize(globalState)}</script>`)
    resolve(clientString);
  });
});

export default generateClient;