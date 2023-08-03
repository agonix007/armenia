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
    { email: 1, address: 1, city: 1, state: 1, zip: 1, walletMoney:1, pic:1 }
  );
  return user;
};

const setAddress = async (user, address, city, state, zip, walletMoney, pic) => {
  if (address !== "" && address !== undefined) {
    user.address = address;
  }
  if (city !== "" && city !== undefined) {
    user.city = city;
  }
  if (state !== "" && state !== undefined) {
    user.state = state;
  }
  if (zip !== "" && zip !== undefined) {
    user.zip = zip;
  }
  if (walletMoney !== "" && walletMoney !== undefined) {
    const wMoney = Number(walletMoney)
    user.walletMoney += wMoney;
  }
  if (pic !== "" && pic !== undefined) {
    user.pic = pic;
  }
  await user.save();
};

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  getUserAddressById,
  setAddress,
};
