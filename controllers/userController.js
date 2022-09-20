const User = require("../models/userModel");

const test = async (req, res) => {
  try {
    res.status(200).send({ success: true, msg: "API working" });
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  console.log(`Login API hit`, req.body);
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
      res
        .status(200)
        .send({ success: true, msg: "Loggedin successfully", data: user });
    } else {
      res.status(200).send({ success: false, msg: "Could not find user" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const register = async (req, res) => {
  console.log(`Register API hit`);
  try {
    const { email, password, publicAddress, privateAddress } = req.body;
    const user = await User.create({
      email: email,
      password: password,
      private_address: privateAddress,
      public_address: publicAddress,
    });
    if (user) {
      res
        .status(200)
        .send({ success: true, msg: "Created successfully", data: user });
    } else {
      res.status(200).send({ success: false, msg: "Could not Create" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  login,
  register,
  test,
};
