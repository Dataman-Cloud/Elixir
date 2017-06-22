var express = require('express')
var config = require('./config/index')
var compression = require('compression')
var history = require('connect-history-api-fallback')

var app = express()

app.use(history())
app.use(compression())
app.use(express.static('./dist'))

var port = process.env.port || config.build.port

module.export = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
