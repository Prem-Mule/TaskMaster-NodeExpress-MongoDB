const mongoose = require("mongoose");
const connectDB = (uri) => {
  return mongoose.connect(uri).then(() => {
    console.log("Connected to database...");
  });
};
module.exports = connectDB;
