const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDb successfully");
  })
  .catch((err) => {
    console.log(`Failed to connect with mongoDb. ${err.message}`);
  });
