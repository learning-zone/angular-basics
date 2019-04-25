'use strict';

// import the `mongoose` helper utilities
let utils = require('./utils');
import chai from 'chai';
let should = chai.should();

// import our `Leopard` mongoose model
import Leopard from '../app/models/leopard/leopard.model';

describe('Leopard: models', () => {

  describe('create()', () => {

    it('should create a new Leopard', (done) => {

      // Create a `Leopard` object to pass to `Leopard.create()``
      let t = {

        text: 'Write better tests... <.<'
      };

      Leopard.create(t, (err, createdLeopard) => {

        // Confirm that that an error does not exist
        should.not.exist(err);

        // verify that the returned `Leopard` is what we expect
        createdLeopard.text.should.equal('Write better tests... <.<');

        // Call done to tell mocha that we are done with this test
        done();
      });
    });
  });
});
