bing-search-api
===============

[![Build Status](https://travis-ci.org/dreadjr/bing-search-api.svg?branch=master)](https://travis-ci.org/dreadjr/bing-search-api)
[![Npm Version](https://img.shields.io/npm/v/bing-search-api.svg)](https://www.npmjs.com/package/bing-search-api)

node.js bing-search-api client

[Bing Search OData Documentation](https://api.datamarket.azure.com/Bing/Search/$metadata)

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
