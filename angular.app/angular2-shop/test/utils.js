// test/utils.js

'use strict';

import config from '../config/config.json';
import mongoose from 'mongoose';

const ENV = 'test';

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = ENV;

let mongoUri = config.MONGO_URI[ENV.toUpperCase()];

beforeEach((done) => {

  function clearDB() {

    for (var i in mongoose.connection.collections) {

      mongoose.connection.collections[i].remove((error, status) => {

        if(error)
          console.error(error);
      });
    }
    
    return done();
  }

  if (mongoose.connection.readyState === 0) {

    mongoose.connect(mongoUri, (err) => {

      if (err) {

        throw err;
      }

      return clearDB();
    });
  } else {

    return clearDB();
  }
});

afterEach((done) => {

  mongoose.disconnect();
  return done();
});
