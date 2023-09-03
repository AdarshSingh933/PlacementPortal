const express = require('express');
const passport = require('passport');

const router = express.Router();

const employeeController = require('../controllers/employeeController');

// ------------------------- Get Requests -----------------------

router.get('/signup', employeeController.signup);
router.get('/signin', employeeController.signin);
router.get('/signout', passport.checkAuthentication, employeeController.signout);
router.get(
  '/download-csv',
  passport.checkAuthentication,
  employeeController.downloadCsv
);
// ------------------------- Post Request -----------------------

router.post('/create', employeeController.createEmployee);
router.post(
  '/create-session',
  passport.authenticate('local', { failureRedirect: '/employee/signin' }),
  employeeController.createSession
);

module.exports = router;
