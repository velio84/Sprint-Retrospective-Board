const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes')

const DB_URL = 'mongodb://localhost:27017/retro-board'
const app = express()
const db = mongoose.connection

mongoose.connect(DB_URL)
mongoose.Promise = global.Promise

db.on( 'error', console.error.bind( console, 'connection error:') )
db.once( 'open', function() {
  console.log( 'Connected to the DB!' )
});

if ( process.env.NODE_ENV === 'production' ) {
  app.use( express.static( 'client/build' ) )
}

app.use( bodyParser.json() )

routes.mount( app )

app.listen( 3001 )
