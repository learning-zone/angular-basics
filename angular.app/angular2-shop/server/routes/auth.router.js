
// ## Authentication API object

// Load user model
import User from '../models/user.model.js';

// Load the Mongoose ObjectId function to cast string as
// ObjectId
let ObjectId = require('mongoose').Types.ObjectId;

export default (app, router, passport, auth, admin) => {

  // ### Authentication API Routes

  // Route to test if the user is logged in or not
  router.get('/auth/loggedIn', (req, res) => {

    // If the user is authenticated, return a user object
    // else return 0
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  // Route to log a user in
  router.post('/auth/login', (req, res, next) => {

    // Call `authenticate()` from within the route handler, rather than
    // as a route middleware. This gives the callback access to the `req`
    // and `res` object through closure.

    // If authentication fails, `user` will be set to `false`. If an
    // exception occured, `err` will be set. `info` contains a message
    // set within the Local Passport strategy.
    passport.authenticate('local-login', (err, user, info) => {

      if (err)
        return next(err);

      // If no user is returned...
      if (!user) {

        // Set HTTP status code `401 Unauthorized`
        res.status(401);

        // Return the info message
        return next(info.loginMessage);
      }

      // Use login function exposed by Passport to establish a login
      // session
      req.login(user, (err) => {

        if (err)
          return next(err);

        // Set HTTP status code `200 OK`
        res.status(200);

        // Return the user object
        res.send(req.user);
      });

    }) (req, res, next);
  });

  router.post('/auth/signin', (req, res, next) => {

	  
      // Call `authenticate()` from within the route handler, rather than
      // as a route middleware. This gives the callback access to the `req`
      // and `res` object through closure.

      // If authentication fails, `user` will be set to `false`. If an
      // exception occured, `err` will be set. `info` contains a message
      // set within the Local Passport strategy.
      passport.authenticate('local-login', (err, user, info) => {
	  
          if (err)
              return next(err);

          // If no user is returned...
          if (!user) {

              // Set HTTP status code `401 Unauthorized`
              res.status(401);

              // Return the info message
              return next(info.loginMessage);
          }

          console.log("Nawal 33. in router.post('/auth/signup",user);
	  
          req.login(user, (err) => {

              if (err)
                  return next(err);

              // Set HTTP status code `200 OK`
              res.status(200);

              // Return the user object
              res.send(req.user);
          });

          // Set HTTP status code `204 No Content`
          //res.sendStatus(204);

      }) (req, res, next);
  });
  router.post('/auth/signup', (req, res, next) => {

	  
    // Call `authenticate()` from within the route handler, rather than
    // as a route middleware. This gives the callback access to the `req`
    // and `res` object through closure.

    // If authentication fails, `user` will be set to `false`. If an
    // exception occured, `err` will be set. `info` contains a message
    // set within the Local Passport strategy.
    passport.authenticate('local-signup', (err, user, info) => {
	  
      if (err)
        return next(err);

      // If no user is returned...
      if (!user) {

        // Set HTTP status code `401 Unauthorized`
        res.status(401);

        // Return the info message
        return next(info.signupMessage);
      }

	  
      req.login(user, (err) => {

          if (err)
              return next(err);

          // Set HTTP status code `200 OK`
          res.status(200);

          // Return the user object
          res.send(req.user);
      });

      // Set HTTP status code `204 No Content`
      //res.sendStatus(204);

    }) (req, res, next);
  });

  // Route to log a user out
  router.post('/auth/logout', (req, res) => {

    req.logOut();

    // Even though the logout was successful, send the status code
    // `401` to be intercepted and reroute the user to the appropriate
    // page
    res.sendStatus(401);
  });

  // Route to get the current user
  // The `auth` middleware was passed in to this function from `routes.js`
  router.get('/auth/user', auth, (req, res) => {

    // Send response in JSON to allow disassembly of object by functions
    res.json(req.user);
  });

  // Route to delete a user. Accepts a url parameter in the form of a
  // username, user email, or mongoose object id.
  // The `admin` Express middleware was passed in from `routes.js`
  router.delete('/auth/delete/:uid', admin, (req, res) => {

    User.remove({

      // Model.find `$or` Mongoose condition
      $or : [

        { 'username' : req.params.uid },

        { 'email' : req.params.uid },

        { '_id' : ObjectId(req.params.uid) }
      ]
    }, (err) => {

      // If there are any errors, return them
      if (err)
        return next(err);

      // HTTP Status code `204 No Content`
      res.sendStatus(204);
    });
  });
};
