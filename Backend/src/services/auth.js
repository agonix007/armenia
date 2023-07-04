const { getUserByEmail } = require("./user");

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  } else {
    const validPassword = await user.isPasswordMatch(password);
    if (!validPassword) {
      throw new Error("Invalid email or password");
    }
    return user;
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
};
