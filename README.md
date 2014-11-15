bing-search-api
===============

[![Build Status](https://travis-ci.org/dreadjr/bing-search-api.svg?branch=master)](https://travis-ci.org/dreadjr/bing-search-api)

node.js bing-search-api client


## Usage

```js
var Bing = require('bing-search-api');

var dotenv = require('dotenv');
dotenv.load();

var client = new Bing();

client.web('query')
  .then(function (result) {
    console.log("result", result);
  })
  .catch(function(error) {
    console.log("error", error);
  });
```
