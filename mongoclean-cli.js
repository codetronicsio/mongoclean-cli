#!/usr/bin/env node
'use strict';
var cli = require('cli');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var clean = require('mongo-clean');
var urlParser = require('url');

require('dotenv').config();

var pjson = require('./package.json');
cli.setApp(pjson.name, pjson.version);

cli.parse({
  mongo: [
    'm',
    'The full connection string to the mongoDB || MONGO env',
    'string',
    'mongodb://localhost:27017/test'
  ],
  url: [
    'u',
    'The hostname for the mongoDB || MONGO_HOST env',
    'string',
    'localhost'
  ],
  port: ['p', 'The PORT for the mongoDB || MONGO_PORT env', 'int', '27017'],
  db: ['d', 'The name for the DB || MONGO_NAME env', 'string', 'test']
});

function sanitizeParameters(host, port, db, mongo) {
  var connection = mongo ? mongo : host + ':' + port + '/' + db;
  var p = urlParser.parse(connection);

  if (!p.hostname || !p.port || !p.path) {
    throw new Error('Invalid connection string. Check your parameters');
  }

  return 'mongodb://' + p.hostname + ':' + p.port + p.path;
}

cli.main(function(args, options) {
  var mongo = process.env.MONGO || options.mongo;
  var url = process.env.MONGO_HOST || options.url;
  var port = process.env.MONGO_PORT || options.port;
  var db = process.env.MONGO_NAME || options.db;

  var connectionString = sanitizeParameters(url, port, db, mongo);

  console.log('Cleanning "' + connectionString + '"');

  MongoClient.connect(connectionString, function(err, db) {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      clean(db, function() {
        process.exit(0);
      });
    }
  });
});
