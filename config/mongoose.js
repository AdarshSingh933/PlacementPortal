const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://Adarsh:VmJzvZBBqnZs11uW@cluster0.2lqvjlu.mongodb.net/Placement-Cell', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to MongoDB'));

db.once('open', function () {
  console.log('Connected to Database :: Mongodb');
});

module.exports = db;
