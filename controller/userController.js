const User = require("../model/userModel");
const { getToken } = require("../util");

module.exports.signIn = async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (signinUser) {
    res.status(200).send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid Email or Password." });
  }
};

module.exports.register = async (req, res) => {
  const existUser = await User.findOne({ email: req.body.email });
  if (existUser) {
    return res.status(500).send({ msg: "User already exist" });
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const newUser = await user.save();
  if (newUser) {
    res.status(200).send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid User Data." });
  }
};

module.exports.createAdminUser = async (req, res) => {
  try {
    const user = new User({
      name: "Asaf",
      email: "asaf@gmail.com",
      password: "1234",
      isAdmin: true,
    });

    const newUser = await user.save();
    res.status(200).send(newUser);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};
