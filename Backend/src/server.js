require("dotenv").config();
const express = require("express");
require("./db/conn");
const cookieParser = require("cookie-parser");

const routes = require("./routers/index");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
