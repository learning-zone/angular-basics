'use strict';

// import the `mongoose` helper utilities
let utils = require('./utils');
import chai from 'chai';
let should = chai.should();

// import our `Product` mongoose model
import Product from '../app/models/product/product.model';

describe('Product: models', () => {

  describe('create()', () => {

    it('should create a new Product', (done) => {

      // Create a `Product` object to pass to `Product.create()``
      let t = {

        text: 'Write better tests... <.<'
      };

      Product.create(t, (err, createdProduct) => {

        // Confirm that that an error does not exist
        should.not.exist(err);

        // verify that the returned `Product` is what we expect
        createdProduct.text.should.equal('Write better tests... <.<');

        // Call done to tell mocha that we are done with this test
        done();
      });
    });
  });
});
