const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.mongo_URL).then(() => {

  console.log('Connected to db');

}).catch((error) => {
  console.error(error);
});