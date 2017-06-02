mongoclean-cli 
==============

[![Build Status](https://travis-ci.org/codetronicsio/mongoclean-cli.svg?branch=master)](https://travis-ci.org/codetronicsio/mongoclean-cli)


Clean all the collections in a mongo database thru the CLI.
This is actually a simple wrapper for the excelent [mongo-clean](https://github.com/mcollina/mongo-clean)

## Install

```bash
$ npm install mongoclean-cli --save-dev
```
## Usage

```bash
$ mongoclean-cli -h

Usage:
  mongoclean-cli [OPTIONS] [ARGS]

Options:
  -u, --url [STRING]     The URL for the mongoDB || MONGO_HOST env (Default is mongodb://localhost)
  -p, --port [NUMBER]    The PORT for the mongoDB || MONGO_PORT env (Default is 27017)
  -d, --db [STRING]      The name for the DB || MONGO_NAME env (Default is test)
  -h, --help             Display help and usage details
```
It uses *dotenv*, so be careful if you have a *.env* file in your _PATH_

## License

MIT
