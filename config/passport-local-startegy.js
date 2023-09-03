const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Employee = require('../models/employeeSchema');

const local = new LocalStrategy({ usernameField: 'email' }, function (
  email,
  password,
  done
) {
  Employee.findOne({ email }, function (error, user) {
    if (error) {
      console.log(`Error in finding user: ${error}`);
      return done(error);
    }

    if (!user || !user.isPasswordCorrect(password)) {
      console.log('Invalid Username/Password');
      return done(null, false);
    }
    return done(null, user);
  });
});

passport.use('local', local);

//serialize user
passport.serializeUser(function (employee, done) {
  done(null, employee.id);
});

//deserialize user
passport.deserializeUser(function (id, done) {
  Employee.findById(id, function (err, user) {
    if (err) {
      console.log('Error in finding user--> Passport');
      return done(err);
    }
    return done(null, user);
  });
});

// check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/employee/signin');
};

// set authenticated user for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};
