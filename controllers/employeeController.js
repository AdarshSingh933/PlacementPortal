const Employee = require('../models/employeeSchema');
const Student = require('../models/studentSchema');
const fs = require('fs');
const fastcsv = require('fast-csv');

// render sign up page
module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('back');
  }
  res.render('signup');
};

// render sign in page
module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('back');
  }
  res.render('signin');
};

// create session
module.exports.createSession = function (req, res) {
  console.log('Session created successfully');
  return res.redirect('/');
};

// signout
module.exports.signout = function (req, res) {
  req.logout();
  return res.redirect('/employee/signin');
};

// create user
module.exports.createEmployee = async function (req, res) {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      console.log(`Passwords dont match`);
      return res.redirect('back');
    }
    const employee = await Employee.findOne({ email });
     //if employee found then return back
    if (employee) {
      console.log(`Email already exists`);
      return res.redirect('back');
    }
    //if employee doesn't found in collection then create new employee document
    const newEmployee = await Employee.create({
      name,
      email,
      password,
    });

    await newEmployee.save();

    if (!newEmployee) {
      console.log(`Error in creating user`);
      return res.redirect('back');
    }
    // after creating employee then redirect to signin page
    return res.redirect('/employee/signin');
  } catch (error) {
    console.log(`Error in creating user: ${error}`);
    res.redirect('back');
  }
};

// download report
module.exports.downloadCsv = async function (req, res) {
  try {
    const students = await Student.find({});

    let data = '';
    let no = 1;
    let csv =
      'S.No, Name, Email, College, Placemnt, Contact Number, Batch, DSA Score, WebDev Score, React Score, Interview, Date, Result';

    for (let student of students) {
      data =
        no +
        ',' +
        student.name +
        ',' +
        student.email +
        ',' +
        student.college +
        ',' +
        student.placement +
        ',' +
        student.contactNumber +
        ',' +
        student.batch +
        ',' +
        student.dsa +
        ',' +
        student.webd +
        ',' +
        student.react;

      if (student.interviews.length > 0) {
        for (let interview of student.interviews) {
          data +=
            ',' +
            interview.company +
            ',' +
            interview.date.toString() +
            ',' +
            interview.result;
        }
      }
      no++;
      csv += '\n' + data;
    }
    //storing csv file in folder report/data.csv
    const dataFile = fs.writeFile(
      'report/data.csv',
      csv,
      function (error, data) {
        if (error) {
          console.log(error);
          return res.redirect('back');
        }
        console.log('Report generated successfully');
        return res.download('report/data.csv');
      }
    );
  } catch (error) {
    console.log(`Error in downloading file: ${error}`);
    return res.redirect('back');
  }
};
