const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT

mongoose
  .connect(process.env.MONGODB_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDb successfully");
  })
  .catch(() => {
    console.log(`Failed to connect with mongoDb. Error: ${err}`);
  });


app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
});
