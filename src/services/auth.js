const { getUserByEmail } = require("./user");

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid login details");
  } else {
    const validPassword = await user.isPasswordMatch(password);
    if (!validPassword) {
      throw new Error("Invalid login details");
    }
    return user;
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
};
