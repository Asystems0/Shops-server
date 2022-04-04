const Product = require("../model/productModel");

module.exports.getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.send(products);
};

module.exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  if (productId.startsWith(":"))
    return res.status(404).send("Product Not Found");
  const product = await Product.findOne({ _id: productId });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
};

module.exports.createNewProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
    });

    const newProduct = await product.save();
    if (newProduct) {
      return res
        .status(201)
        .send({ message: "New Prosuct Created", data: newProduct });
    } else {
      return res.status(500).send({ message: "Error in creating product." });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.editProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);

    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
    }

    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: "Product Updated", data: updatedProduct });
    } else {
      return res.status(500).send({ message: "Error in Updating product." });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findById(productId);
    if (deletedProduct) {
      await deletedProduct.remove();
      res.send({ message: "Product Deleted" });
    } else {
      return res.status(500).send({ message: "Error in Deletion." });
    }
  } catch (err) {
    return res.status(500).send({ message: "Error in Deletion." });
  }
};
