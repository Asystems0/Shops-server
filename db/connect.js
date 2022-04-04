const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectDB = () => {
  return mongoose.connect(process.env.MONGDB_URL, () =>
    console.log("MongoDB connected")
  );
};

module.exports = connectDB;
