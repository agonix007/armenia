require("dotenv").config();
const express = require("express");
require("./db/conn");
const path  = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const routes = require("./routers/index");
const frontend_routes = require("./routers/frontend");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   cors({
//     origin: "https://armenia.netlify.app",
//     credentials: true,
//   })
// );
app.use(cors());

app.options("*", cors());
app.use(cookieParser());

app.use("/api", routes);

const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath);

hbs.registerPartials(partialPath);

app.use("/", frontend_routes);

// app.get("/", (req,res)=>{
//   res.render("index");
// })
// app.get("/login", (req,res)=>{
//   res.render("login")
// })
// app.get("/register", (req,res)=>{
//   res.render("register")
// })
// app.get("/products", (req,res)=>{
//   res.render("allProducts")
// })
// app.get("/cart", (req,res)=>{
//   res.render("cart")
// })
// app.get("/checkout", (req,res)=>{
//   res.render("checkout")
// })
// app.get("/about", (req,res)=>{
//   res.render("aboutUs")
// })
// app.get("/successful", (req,res)=>{
//   res.render("successful")
// })
// app.get("*", (req, res) => {
//   res.status(404).send(`<h1>404 Page not found</h1>`);
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
