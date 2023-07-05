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
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 5 * 60 * 1000),
      httpOnly: true,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUserWithEmailAndPassword(email, password);
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 5 * 60 * 1000),
      httpOnly: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(401).send(error.message);
  }
};

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((currToken) => {
      return currToken.token !== req.token;
    });
    res.clearCookie("jwt");
    console.log("Logout Successfully");
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

const logoutFromAll = async (req, res) => {
  try {
    req.user.tokens = [];
    res.clearCookie("jwt");
    console.log("Logout Successfully");
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  logoutFromAll,
};
