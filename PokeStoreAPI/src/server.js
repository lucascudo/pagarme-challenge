'use strict';

//  Package imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const logger = require('morgan');
const envSetup = require('./config/environment.js');
const PORT = process.env.PORT || 3000;
envSetup();

//  Router definitions imports
const pokemonRouter = require('./routes/pokemonRouter.js');
const purchaseRouter = require('./routes/purchaseRouter.js');


const logStream = fs.createWriteStream(`${__dirname}/access.log`, { flags: 'a' }); //  HTTP Logging

const server = express(); // Application setup
server.use(cors()); // Middleware to enable CORS
server.use('/static', express.static(__dirname + '/uploads')); // Serve static files
server.use(bodyParser.json()); //  Middleware to accept JSON payloads only
server.use(logger('combined', { stream: logStream }));

//  Route definitions
server.use('/pokemon', pokemonRouter);
server.use('/purchase', purchaseRouter);
//  Setup helper functions
const boot = () => server.listen(PORT);
const close = () => server.close;

// If this wasn't required as a module, we start the server automagically
if (require.main === module) {
  boot();
}

module.exports = exports = {
  app: server,
  boot,
  close,
};
