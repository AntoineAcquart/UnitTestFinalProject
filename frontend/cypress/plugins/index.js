/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}

let server;      // static reference to the mock server
// so we can close and re-assign on 2nd call

module.exports = (on, config) => {
  on('task', {
    mockServer(options) {

      const fs = require('fs')
      const http = require('http')

      if (server) server.close()
      server = http.createServer((req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        let data
        options.mocks.forEach(mock => {
          if (req.url === mock.route && req.method === mock.method) {
            data = fs.readFileSync(`./cypress/fixtures/${mock.fixture}`)
          }
        })
        if (data) {
          res.end(data)
        } else {
          res.end()
        }
      })
      server.listen(8000)
      console.log(`listening at port 8000`)

      return null
    },
    stopServer() {
      if (server) server.close();
      return null
    },
  })
}
