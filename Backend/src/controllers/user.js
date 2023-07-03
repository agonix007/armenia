const {
  getUserById,
  getUserAddressById,
  setAddress,
} = require("../services/user");

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    if (!user) {
      throw new Error("User not found");
    }

    // if (user._id.toString() !== req.user.id) {
    //   throw new Error("Forbidden");
    // }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const setAddresses = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserAddressById(id);

    if (!user) {
      throw new Error("User not found");
    }

    // if (user.email != req.user.email) {
    //   throw new ApiError(
    //     httpStatus.FORBIDDEN,
    //     "User not authorized to access this resource"
    //   );
    // }

    await setAddress(
      user,
      req.body.address,
      req.body.city,
      req.body.state,
      req.body.zip
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getUser, setAddresses };
