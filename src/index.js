import express from 'express';
var https   = require('https');

let app = require('./server').default;
const path = require("path") // path module 
const fs = require("fs") //file system module

if (module.hot) {
  module.hot.accept('./server', function() {
    console.log('🔁  HMR Reloading `./server`...');
    try {
      app = require('./server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;


const options = {
  //key: fs.readFileSync(__dirname + '/public/cert/privkey.pem', 'utf8'),
  //cert: fs.readFileSync(__dirname + '/public/cert/cert.pem', 'utf8')
};

// ****************************** */

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started on port ${port}`);
  });

  // ***********************

// var appHttps = express();
// const httpsServer = https.createServer(options, app);
// var host = 'httpsServer.address().address;'

// httpsServer.listen(port, ()=>console.log('Server start ', + host + 'on port ', port))

// *************************************** */
