const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// create a virtual property to set hashed password
employeeSchema.virtual('password').set(function (value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
});

// function to compare hashed password
employeeSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
