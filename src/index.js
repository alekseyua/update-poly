import express from 'express';
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
// const options ={
//   key:fs.readFileSync(path.join(__dirname,'cert', 'key.pem')),
//   cert:fs.readFileSync(path.join(__dirname,'cert','cert.pem')) 
// }
export default express()
  .use((req, res) => app.handle(req, res))
  // .use(options)
  .listen(port, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started on port ${port}`);
  });
