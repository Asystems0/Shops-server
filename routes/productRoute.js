const router = require("express").Router();
const { isAuth, isAdmin } = require("../util");

const {
  getAllProducts,
  createNewProduct,
  editProduct,
  deleteProduct,
  getProductById,
} = require("../controller/productController");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", isAuth, isAdmin, createNewProduct);
router.put("/:id", isAuth, isAdmin, editProduct);
router.delete("/:id", isAuth, isAdmin, deleteProduct);

module.exports = router;
