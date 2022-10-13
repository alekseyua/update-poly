import App from './App';
import React, { createContext } from 'react';
import { StaticRouter } from 'react-router-dom/server';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { matchPath } from "react-router-dom";
import Helmet from 'react-helmet';

import { StoreContext } from 'storeon/react';
import { store } from './store';

const cookieParser = require('cookie-parser');
const document = require('global/document');
const cors = require('cors');

import path from 'path';
import api from './api/api';
import { PATHS } from './const';

const routes = require('./routes/routes.js');

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint] ? assets[entrypoint].css ?
    assets[entrypoint].css.map(asset =>
      `<link rel="stylesheet" href="${asset}">`
    ).join('') : '' : '';
};

const jsScriptTagsFromAssets = (assets, entrypoint, ...extra) => {
  return assets[entrypoint] ? assets[entrypoint].js ?
    assets[entrypoint].js.map(asset =>
      `<script src="${asset}" ${extra.join(" ")}></script>`
    ).join('') : '' : '';
};


export const renderApp = async (req, res, next) => {
  try {
    // console.log('process.env.RAZZLE_PUBLIC_DIR =' , process.env.RAZZLE_PUBLIC_DIR)
    console.log('__dirname' , req.path)
    global.document = document;
    global.document.cookie = req.headers.cookie;
    global.localStorage = { getItem: () => '' };
    global.window = {};
    // получаем совпадающий роут
    // const matchRoute = routes.find( route => matchPath( req.originalUrl, route ) );
    let urlSearch = req.url
    // req.url.includes('/news-') ? urlSearch = '/news-' : urlSearch
    ///news-
    const activeRoute = await routes.find(route => matchPath(urlSearch, typeof route.path === 'function' ? route.path() : route.path, route)) || {};
    // // получаем данные совпавшего компонента
    const auth_token = req.cookies[api.AUTH_TOKEN_KEY];
    const axiosParams = auth_token 
    ? {       
      headers: { Authorization: `Token ${auth_token}` } 
    } 
    : {};
     const promise = activeRoute.fetchInitialData
     ? activeRoute.fetchInitialData(req.path, axiosParams)
     //: Promise.resolve();
     : PATHS.ALL.fetchInitialData(req.path, axiosParams)
    // const promise = PATHS.ALL.fetchInitialData(req.path, axiosParams)
    //  console.log( '+++++++activeRoute url*****', promise )

    promise
      .then((data) => {
        // console.log('data ===== ', data)
        const markup = renderToString(
          <StoreContext.Provider value={store} >
            <StaticRouter location={req.url} context={data} >
              <App context={data} />
            </StaticRouter>
          </StoreContext.Provider>
        );
        const helmet = Helmet.renderStatic();
        // console.log('helmet', helmet)
        // задаём значение для глобальной переменной 'initial_state'
        // console.log('context ', context.componentData)
        // <meta name="viewport" content="width=device-width, initial-scale=1 "></meta>
        //user-scalable=no, 
        // <meta name="viewport" content="width=device-width, initial-scale=0.7">

        const html = `<!doctype html>
        <html lang="ru">
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charset="utf-8" />
            <meta name='viewport' content='maximum-scale=1.0,width=device-width, height=device-height, initial-scale=1.0' />
            ${cssLinksFromAssets(assets, 'client')}

            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}

          ${`<title>${data.init_state.page_info.title}</title>`}
            
          ${`<script defer >window.__INITIAL_DATA__ = ${JSON.stringify(data)
            .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, '')
            .replace(/</g, '\\\u003c')}</script>`}            

        </head>
        <body>
            <div id="root">${markup}</div>
            ${jsScriptTagsFromAssets(assets, 'client', 'defer', 'crossorigin')}
        </body>
      </html>`

        // console.log(html)

        return res.status(200).send(html);
      })
      // .catch(next);
      .catch(err=>console.log('errrrrrrr',err))
  } catch (err) {
    console.log('ggggggggggg',err)
  }

}


const server = express();

/**
 * console.log('process.env.RAZZLE_PUBLIC_DIR',process.env.RAZZLE_PUBLIC_DIR)  
 * process.env.RAZZLE_PUBLIC_DIR = /home/alekseyua/Desktop/my-app-poly/public
 */

server
  .disable('x-powered-by')
  // .use(express.static('public'))
  // .use('/static', express.static(__dirname + '/public'))  
  
  // .use(express.static(publicFolder))
  
  
  .use(cors())
  .use(cookieParser())
  
  // .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(express.static('public'))
  // .use('/static', express.static(__dirname + '/public'))  

  // .use(express.static(__dirname + '/public'))
  // обслуживание статических ресурсов
  // .get( /\.(js|css|map|ico)$/, express.static( path.resolve( __dirname, '../build' ) ) )

  .get('/*', (req, res, next) => {
    // const { data, html } = 
    renderApp(req, res, next);
    // console.log('context',data)
    // if (context.url) {
    //   res.redirect(context.url);
    // } else {
    // res.status(200).send(html);
    // }
  });

export default server;
