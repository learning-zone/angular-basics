// ```
// passport.conf.js
// *config/passport.conf.js*

// This file contains the function which configures the PassportJS
// instance passed in.

// Load PassportJS strategies
import LocalStrategy from 'passport-local';

// Load user model
import User from '../server/models/user.model.js';

export default (passport) => {

  // Define length boundariess for expected parameters
  let bounds = {

    username : {

      minLength : 3,

      maxLength : 128
    },

    password : {

      minLength : 3,

      maxLength : 128
    },

    email : {

      minLength : 3,

      maxLength : 256
    }
  };

  // Function to check a string against a REGEX for email validity
  let validateEmail = (email) => {

      let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

      return re.test(email);
  };

  // Helper function to validate string length
  let checkLength = (string, min, max) => {
    
	
    if(string.length > max || string.length < min)
      return false;
    else
      return true;
  };

  // # Passport Session Setup

  // *required for persistent login sessions*

  // Passport needs the ability to serialize and deserialize users out of
  // session data

  // ## Serialize User
  passport.serializeUser((user, done) => {

    let sessionUser = {

      _id : user._id,

      username : user.username,

      role : user.role
    };

    done(null, sessionUser);
  });

  // ## Deserialize User
  passport.deserializeUser((sessionUser, done) => {

    // The sessionUser object is different from the user mongoose
    // collection

    // It is actually req.session.passport.user and comes from the
    // session collection
    done(null, sessionUser);
  });

  // # Local Signup

  // We are using named strategies since we have one for login and one
  // for signup

  // By default, if there is no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({


    // By default, the local strategy uses username and password
    usernameField : 'username',

    passwordField : 'password',

    // Allow the entire request to be passed back to the callback
    passReqToCallback : true
  },

  (req, username, password, done) => {

    
    // If the length of the username string is too long/short,
    // invoke verify callback
    if(!checkLength(username, bounds.username.minLength, bounds.username.maxLength)) {

      // ### Verify Callback

      // Invoke `done` with `false` to indicate authentication
      // failure
      return done(null,

        false,

        // Return info message object
        { signupMessage : 'Invalid username field length.' }
      );
    }

    // If the length of the password string is too long/short,
    // invoke verify callback
    if(!checkLength(password, bounds.password.minLength, bounds.password.maxLength)) {

      // ### Verify Callback

      // Invoke `done` with `false` to indicate authentication
      // failure
      return done(null,

        false,

        // Return info message object
        { signupMessage : 'Invalid password length.' }
      );
    }

    // If the length of the email string is too long/short,
    // invoke verify callback
    if(!checkLength(req.body.email, bounds.email.minLength, bounds.email.maxLength)) {

      // ### Verify Callback

      // Invoke `done` with `false` to indicate authentication
      // failure
      return done(null,

        false,

        // Return info message object
        { signupMessage : 'Invalid email length.' }
      );
    }

    // If the string is not a valid email...
    if(!validateEmail(req.body.email)) {

      // ### Verify Callback

      // Invoke `done` with `false` to indicate authentication
      // failure
      return done(null,

        false,

        // Return info message object
        { signupMessage : 'Invalid email address.' }
      );
    }

    // Asynchronous
    // User.findOne will not fire unless data is sent back
    process.nextTick(() => {

      // Find a user whose email or username is the same as the passed
      // in data

      // We are checking to see if the user trying to login already
      // exists
      User.findOne({

        // Model.find `$or` Mongoose condition
        $or : [

          { 'username' : username },

          { 'email' : req.body.email }
        ]
      }, (err, user) => {

        // If there are any errors, return the error
        if (err)
          return done(err);

        // If a user exists with either of those ...
        if(user) {

          // ### Verify Callback

          // Invoke `done` with `false` to indicate authentication
          // failure
          return done(null,

            false,

            // Return info message object
            { signupMessage : 'That username/email is already ' +
            'taken.' }
          );

        } else {

          // If there is no user with that email or username...

          // Create the user
          let newUser = new User();

          // Set the user's local credentials

          // Combat case sensitivity by converting username and
          // email to lowercase characters
          newUser.username = req.body.email.toLowerCase();

          newUser.email = req.body.email.toLowerCase();

          // Hash password with model method
          newUser.password = newUser.generateHash(password);

          // Save the new user
          newUser.save((err) => {

            if (err)
              throw err;

            return done(null, newUser);
          });
        }
      });
    });
  }));

  // # Local Login

  // We are using named strategies since we have one for login and one
  // for signup

  // By default, if there is no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({

    // By default, local strategy uses username and password
    usernameField : 'email',

    passwordField : 'password',

    // Allow the entire request to be passed back to the callback
    passReqToCallback : true
  },

  (req, username, password, done) => {

    // ## Data Checks

    // If the length of the username string is too long/short,
    // invoke verify callback.
    // Note that the check is against the bounds of the email
    // object. This is because emails can be used to login as
    // well.
    if(!checkLength(username, bounds.username.minLength, bounds.email.maxLength)) {

      // ### Verify Callback

      // Invoke `done` with `false` to indicate authentication
      // failure
      return done(null,

        false,

        // Return info message object
        { loginMessage : 'Invalid username/email length.' }
      );
    }

    // If the length of the password string is too long/short,
    // invoke verify callback
    if(!checkLength(password, bounds.password.minLength, bounds.password.maxLength)) {

      // ### Verify Callback

      // Invoke `done` with `false` to indicate authentication
      // failure
      return done(null,

        false,

        // Return info message object
        { loginMessage : 'Invalid password length.' }
      );
    }

    // Find a user whose email or username is the same as the passed
    // in data

    // Combat case sensitivity by converting username to lowercase
    // characters
    User.findOne({

      // Model.find `$or` Mongoose condition
      $or : [

        { 'username' : username.toLowerCase() },

        { 'email' : username.toLowerCase() }
      ]
    }, (err, user) => {

      // If there are any errors, return the error before anything
      // else
      if (err)
        return done(err);

      // If no user is found, return a message
      if (!user) {

        return done(null,

          false,

          { loginMessage : 'That user was not found. ' +
          'Please enter valid user credentials.' }
        );
      }

      // If the user is found but the password is incorrect
      if (!user.validPassword(password)) {

        return done(null,

          false,

          { loginMessage : 'Invalid password entered.' });
      }

      // Otherwise all is well; return successful user
      return done(null, user);
    });
  }));
};
