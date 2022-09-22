import App from './App';
import React from 'react';
import cors from 'cors';
import { StaticRouter } from 'react-router-dom/server';
import express from 'express';
import { renderToString } from 'react-dom/server';
import fetchPopularRepos from './api';
import routes from './routes';
import { matchPath } from 'react-router-dom';
import serialize from "serialize-javascript"

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint] ? assets[entrypoint].css ?
  assets[entrypoint].css.map(asset=>
    `<link rel="stylesheet" href="${asset}">`
  ).join('') : '' : '';
};

const jsScriptTagsFromAssets = (assets, entrypoint, ...extra) => {
  return assets[entrypoint] ? assets[entrypoint].js ?
  assets[entrypoint].js.map(asset=>
    `<script src="${asset}" ${extra.join(" ")}></script>`
  ).join('') : '' : '';
};

export const renderApp = (req, res, next) => {
  const context = {};
  const name = 'Sergey'

      const activeRoute = routes.find((route) =>
      matchPath(route.path, req.url)
    ) || {}
  

    const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

    promise.then((data) => {
      console.log(data)
      const markup = renderToString(
        <StaticRouter location={req.url}>
          <App serverData={data} />
        </StaticRouter>
      );
      const html = `<!doctype html>
      <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>Welcome to Razzle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${cssLinksFromAssets(assets, 'client')}
          <script>
            window.__INITIAL_DATA__ =  ${serialize(data)}
          </script>
      </head>
      <body>
          <div id="root">${markup}</div>
  
          ${jsScriptTagsFromAssets(assets, 'client', 'defer', 'crossorigin')}
      </body>
      </html>`
      console.log(context)
      res.status(200).send(html);
  
    }).catch(next);

    // if (context.url) {
    //   res.redirect(context.url);
    // } else {
      // res.status(200).send(html);
    // }
}

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(cors())
  // .get('/*', (req, res, next) => {
  //     renderApp(req, res, next);
  // })
  .get("*", (req, res, next) => {
    // console.log('req.url', req.url)
    const activeRoute =
      routes.find((route) => matchPath(route.path, req.url)) || {};
  
    const promise = activeRoute.fetchInitialData
      ? activeRoute.fetchInitialData(req.path)
      : Promise.resolve();
  
    promise
      .then((data) => {
        const markup = renderToString(
          <StaticRouter location={req.url} >
            <App serverData={data} />
          </StaticRouter>
        );
  
        res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>SSR with React Router</title>
            <script src="/bundle.js" defer></script>
            <link href="/main.css" rel="stylesheet">
            <script>
              window.__INITIAL_DATA__ = ${serialize(data)}
            </script>
          </head>
  
          <body>
            <div id="root">${markup}</div>
          </body>
        </html>
      `);
      })
      .catch(next);
  });

export default server;  
