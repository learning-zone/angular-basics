'use strict';

// import the `mongoose` helper utilities
let utils = require('./utils');
import chai from 'chai';
let should = chai.should();

// import our `Todo` mongoose model
import Todo from '../app/models/todo.model';

describe('Todo: models', () => {

  describe('create()', () => {

    it('should create a new Todo', (done) => {

      // Create a `Todo` object to pass to `Todo.create()``
      let t = {

        text: 'Write better tests... <.<'
      };

      Todo.create(t, (err, createdTodo) => {

        // Confirm that that an error does not exist
        should.not.exist(err);

        // verify that the returned `todo` is what we expect
        createdTodo.text.should.equal('Write better tests... <.<');

        // Call done to tell mocha that we are done with this test
        done();
      });
    });
  });
});
