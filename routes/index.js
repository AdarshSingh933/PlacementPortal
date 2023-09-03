const express = require('express');

const router = express.Router();
const employeeRoute = require('./employeeRoute');
const studentRoute = require('./studentRoute');
const homeController = require('../controllers/homeController');
const companyRoute = require('./companyRoute');
const passport = require('passport');

router.get('/', passport.checkAuthentication, homeController.homePage);
router.use('/employee', employeeRoute);
router.use('/students', studentRoute);
router.use('/company', companyRoute);
router.use('/search-job',require('./searchJobRoute'));

module.exports = router;
