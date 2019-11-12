const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
// const bodyParser = require('body-parser');
// const router = require('./router')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);
  // .use(bodyParser.urlencoded({ extended: false }))
  // .use(bodyParser.json())
  // app.use('/api', router);

  // app.get('http://localhost:3000/load', (req, res) => {
  //   console.log('api:load');
  //   const images = [
  //     1, 2, 3
  //   ];
  //   res.send(images);
  // });

  // app.post('/api/save', (req, res) => {
  //   console.log('api:save');
  //   res.send(req.body);
  // });

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
