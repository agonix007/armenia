const {
  getUserById,
  getUserAddressById,
  setAddress,
} = require("../services/user");

const getUser = async (req, res) => {
  try {
    const id = req.user._id.toString();
    const user = await getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    //It means user is present in db but accessing other profiles
    // if (user._id.toString() !== req.user.id) {
    //   throw new Error("User is not authorized to access");
    // }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const setFullAddress = async (req, res) => {
  try {
    const id = req.user._id.toString();
    const user = await getUserAddressById(id);

    if (!user) {
      throw new Error("User not found");
    }
    //It means user is present in db but accessing other profiles
    // if (user.email != req.user.email) {
    //   throw new Error("User is not authorized to access");
    // }

    await setAddress(
      user,
      req.body.address,
      req.body.city,
      req.body.state,
      req.body.zip,
      req.body.walletMoney
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { getUser, setFullAddress };
