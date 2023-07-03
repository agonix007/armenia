const User = require("../models/user");

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

const getUserAddressById = async (userId) => {
  const user = await User.findOne(
    { _id: userId },
    { email: 1, address: 1, city: 1, state: 1, zip: 1 }
  );
  return user;
};

const setAddress = async (user, address, city, state, zip) => {
    user.address = address;
    user.city = city;
    user.state = state;
    user.zip = zip;

    await user.save();
};

module.exports= {
    getUserById,
    getUserAddressById,
    setAddress
}