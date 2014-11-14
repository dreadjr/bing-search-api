var nock = require('nock');
var sinon = require('sinon');
var Promise = require('bluebird');
var _ = require('lodash');

var chai = require('chai'),
  assert = chai.assert,
  should = chai.should(),
  expect = chai.expect;

var Bing = require('./../lib/client');
var client = new Bing({ accountKey: '123' });

describe('bing', function () {
  it('should accept accountKey', function() {
    var tmp = new Bing({ accountKey: '123' });

    expect(tmp.options).to.exist
      .with.property('accountKey').to.equal('123');
  });

  it('should build correct queries', function (done) {
    before(function () {
      nock.disableNetConnect();
    });

    var scope = nock('https://api.datamarket.azure.com:443/')
      .log(console.log)
      .get('/Bing/Search/Web?Query=%27query%27&%24top=10&%24format=json&Market=%27en-US%27')
      .reply(200, {
        results: true
      });

    client.web('query')
      .then(function (result) {
        console.log("xxx", result);
        expect(result).to.exist
          .with.property('results').to.be.true;

        done();
      })
      .catch(function(error) {
        done(error);
      });

    after(function () {
      nock.restore();
      nock.enableNetConnect();
    });
  });
});