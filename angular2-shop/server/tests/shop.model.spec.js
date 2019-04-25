'use strict';

// import the `mongoose` helper utilities
let utils = require('./utils');
import chai from 'chai';
let should = chai.should();

// import our `Shop` mongoose model
import Shop from '../app/models/shop/shop.model';

describe('Shop: models', () => {

  describe('create()', () => {

    it('should create a new Shop', (done) => {

      // Create a `Shop` object to pass to `Shop.create()``
      let t = {

        text: 'Write better tests... <.<'
      };

      Shop.create(t, (err, createdShop) => {

        // Confirm that that an error does not exist
        should.not.exist(err);

        // verify that the returned `Shop` is what we expect
        createdShop.text.should.equal('Write better tests... <.<');

        // Call done to tell mocha that we are done with this test
        done();
      });
    });
  });
});
