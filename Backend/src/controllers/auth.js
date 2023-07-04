const { createUser } = require("../services/user");
const { loginUserWithEmailAndPassword } = require("../services/auth");

const register = async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    if (password !== cpassword) {
      throw new Error("Passwords are not matching.");
    }
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUserWithEmailAndPassword(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports = {
  register,
  login,
};
