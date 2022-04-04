const router = require("express").Router();

const {
  signIn,
  register,
  createAdminUser,
} = require("../controller/userController");

router.post("/signin", signIn);

router.post("/register", register);

router.post("/createadmin", createAdminUser);

module.exports = router;
