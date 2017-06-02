'use strict';
var cli = require('cli');
var mongodb = process.ENV === 'test'
  ? require('mongo-mock')
  : require('mongodb');
var MongoClient = mongodb.MongoClient;
var clean = require('mongo-clean');
var urlParser = require('url');

require('dotenv').config();

var pjson = require('./package.json');
cli.setApp(pjson.name, pjson.version);

cli.parse({
  url: [
    'u',
    'The URL for the mongoDB || MONGO_HOST env',
    'string',
    'mongodb://localhost'
  ],
  port: ['p', 'The PORT for the mongoDB || MONGO_PORT env', 'int', '27017'],
  db: ['d', 'The name for the DB || MONGO_NAME env', 'string', 'test']
});

function sanitizeParameters(url, port, db) {
  var connection = url + ':' + port + '/' + db;
  var p = urlParser.parse(connection);
  console.log(p);

  if (!p.hostname || !p.port || !p.path) {
    throw new Error('Invalid connection string. Check your parameters');
  }

  return 'mongodb://' + p.hostname + ':' + p.port + p.path;
}

cli.main(function(args, options) {
  var url = options.url || process.env.MONGO_HOST;
  var port = options.port || process.env.MONGO_PORT;
  var db = options.db || process.env.MONGO_NAME;

  var connectionString = sanitizeParameters(url, port, db);

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
