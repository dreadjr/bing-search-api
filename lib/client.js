var request = require('request');
var qs = require('querystring');
var _ = require('lodash');
var Promise = require('bluebird');

function BingSearchClient(options) {
  var defaults = {
    rootUri: "https://api.datamarket.azure.com/Bing/Search/",
    accountKey: process.env.BING_ACCOUNT_KEY || null
  };

  //merge options passed in with defaults
  this.options = _.extend(defaults, options);

  this.defaultService = 'Web';
  this.defaultParameters = {
    Query: '',
    $top: 10,
    $format: 'json',
    Market: 'en-US'
  };
}

// https://onedrive.live.com/view.aspx?resid=9C9479871FBFA822!112&app=Word&authkey=!ANNnJQREB0kDC04
var fn = BingSearchClient.prototype;

fn.search = function(service, q, parameters, reqOptions) {
  function quote(param) {
    return "'" + param + "'";
  }

  var self = this;

  return new Promise(function (resolve, reject) {
    var service = service || self.defaultService;
    var parameters = _.extend(self.defaultParameters, parameters);

    parameters.Query = q;
    parameters.Query = quote(parameters.Query);
    parameters.Market = quote(parameters.Market);

    var defaultRequest = {
      url: self.options.rootUri + service,
      qs: parameters,
      auth: {
        user: self.options.accountKey,
        pass: self.options.accountKey
      }
    };

    var bingRequest = _.extend(defaultRequest, reqOptions);

    request(bingRequest, function(err, res, body) {
      if (err) {
        reject(err);
      } else if (res && res.statusCode !== 200) {
        reject(new Error(body));
      } else {
        try {
          var rtn = _.isString(body) ? JSON.parse(body) : body;
          resolve(rtn);
        } catch(e) {
          var error = new Error("Failed to parse body");
          error.body = body;
          error.response = res;
          error.error = err;
          reject(error);
        }
      }
    });
  });
};

_.each(['Web', 'Image', 'Video', 'News', 'Spell', 'Related'], function(service) {
  fn[service.toLowerCase()] = _.partial(fn.search, service);
});

module.exports = BingSearchClient;