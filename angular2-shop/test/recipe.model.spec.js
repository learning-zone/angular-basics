'use strict';

// import the `mongoose` helper utilities
let utils = require('./utils');
import chai from 'chai';
let should = chai.should();

// import our `Recipe` mongoose model
import Recipe from '../app/models/recipe.model';

describe('Recipe: models', () => {

  describe('create()', () => {

    it('should create a new Recipe', (done) => {

      // Create a `Recipe` object to pass to `Recipe.create()``
      let r = {

        title: 'Peanut Butter Cookies',

        tags: [{
          name: 'tag1'
        },{
          name: 'tag2'
        }],

        rating: 5,

        creator: 'datatype_void',

        description: 'Peanut butter... cookies... what else is there to say?',

        ingredients: [{
          amount: '1/2',

          unit: 'cup',

          name: 'coconut flour',
        }, {
          amount: '1',

          unit: 'cup',

          name: 'crunchy peanut butter',
        }, {
          amount: '1/2',

          unit: 'cup',

          name: 'coconut sugar',
        }, {
          amount: '1/2',

          unit: 'teaspoon',

          name: 'magic',
        }],

        directions: [{
          step: 'Mix everything'
        }, {
          step: 'Bake at 350F until satisfied'
        }, {
          step: 'Enjoy delectable cookies'
        }]
      };

      Recipe.create(r, (err, createdRecipe) => {

        // Confirm that that an error does not exist
        should.not.exist(err);

        // verify that the returned `recipe` is what we expect
        createdRecipe.title.should.equal(r.title);

        // The `Recipe` object should have a tags property
        should.exist(createdRecipe.tags);

        // Which should be an array with a length equal to
        // that of the test object we created
        createdRecipe.tags.should.have.length(r.tags.length);

        // For each `tag` object in the `tags` array,
        // check if it has a property `name` and then
        // see if the `name` value is equal to the
        // one we passed in with the test object
        for (let i in createdRecipe.tags) {

          should.exist(createdRecipe.tags[i].name);

          createdRecipe.tags[i].should.equal(r.tags[i]);
        }

        // It should also have `rating`, `creator`, and `description`
        // properties equal to those that we passed in
        createdRecipe.rating.should.equal(r.rating);
        createdRecipe.creator.should.equal(r.creator);
        createdRecipe.description.should.equal(r.description);

        // The `Recipe` object should have an `ingredients` property
        should.exist(createdRecipe.ingredients);
        // `ingredients` should be an array with a length equal to
        // that of the test object's `ingredients` property
        createdRecipe.ingredients.should.have.length(r.ingredients.length);

        // For each `ingredient` object in the `ingredients` array,
        // check if it has a property `amount` and then
        // see if the `amount` value is equal to the
        // one we passed in with the test object
        // Repeat for the `unit` and `name` properties
        // for each `ingredient`
        for (let i in createdRecipe.ingredients) {

          should.exist(createdRecipe.ingredients[i].amount);
          should.exist(createdRecipe.ingredients[i].unit);
          should.exist(createdRecipe.ingredients[i].name);

          createdRecipe.ingredients[i].amount
            .should.equal(r.ingredients[i].amount);

          createdRecipe.ingredients[i].unit
            .should.equal(r.ingredients[i].unit);

          createdRecipe.ingredients[i].name
            .should.equal(r.ingredients[i].name);
        }

        // The `Recipe` object should have a `directions` property
        should.exist(createdRecipe.directions);

        // Which should be an array with a length equal to
        // that of the test object we created
        createdRecipe.directions.should.have.length(r.directions.length);

        // For each `direction` object in the `directions` array,
        // check if it has a property `step` and then
        // see if the `step` value is equal to the
        // one we passed in with the test object
        for (let i in createdRecipe.directions) {

          should.exist(createdRecipe.directions[i].step);

          createdRecipe.directions[i].should.equal(r.directions[i]);
        }

        // Call done to tell mocha that we are done with this test
        done();
      });
    });
  });
});
