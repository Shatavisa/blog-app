const mongoose = require("mongoose");

const connectDb = () => {
  try {
    return mongoose
      .connect(`${process.env.MONGODB_URI}`)
      .then(() => console.log("db connected"));
  } catch (error) {
    console.log("MongoDb connection error", error);
    process.exit(1);
  }
};

module.exports = { connectDb };
