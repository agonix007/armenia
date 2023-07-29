const User = require("../models/user");

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

const getUserByEmail = async (userEmail) => {
  const user = await User.findOne({ email: userEmail });
  return user;
};

const createUser = async (userBody) => {
  const isEmailTaken = await User.isEmailTaken(userBody.email);
  if (isEmailTaken) {
    throw new Error("Email already taken");
  }
  const newUser = new User({ ...userBody });
  return await newUser.save();
};

const getUserAddressById = async (userId) => {
  const user = await User.findOne(
    { _id: userId },
    { email: 1, address: 1, city: 1, state: 1, zip: 1 }
  );
  return user;
};

const setAddress = async (user, address, city, state, zip, walletMoney) => {
  user.address = address;
  user.city = city;
  user.state = state;
  user.zip = zip;
  user.walletMoney = walletMoney;

  await user.save();
};

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  getUserAddressById,
  setAddress,
};
