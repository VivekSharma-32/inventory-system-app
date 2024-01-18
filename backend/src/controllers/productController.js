const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    category,
    brand,
    quantity,
    description,
    image,
    regularPrice,
    price,
  } = req.body;

  // validations
  if (!name || !category || !brand || !quantity || !price || !description) {
    res.status(400);
    throw new Error("Please fill in all the fields.");
  }

  // create product
  const product = await Product.create({
    name,
    sku,
    category,
    brand,
    quantity,
    description,
    image,
    regularPrice,
    price,
  });

  res.status(201).json(product);
});

// get products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort("-createdAt");

  res.status(200).json(products);
});

// get single product
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "Product deleted",
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    brand,
    quantity,
    description,
    image,
    regularPrice,
    price,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // update a product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name,
      category,
      brand,
      quantity,
      description,
      image,
      regularPrice,
      price,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updatedProduct);
});

// review products
// const reviewProduct = asyncHandler(async (req, res) => {
//   const { star, review, reviewDate } = req.body;
//   const { id } = req.params;

//   // validations
//   if (star < 1 || !review) {
//     res.status(400);
//     throw new Error("Please add a star and review");
//   }

//   const product = await Product.findById(id);

//   if (!product) {
//     res.status(404); // Change the status code to 404
//     throw new Error("Product not found");
//   }

//   // Update rating
//   product.ratings.push({
//     star,
//     review,
//     reviewDate,
//     name: req.user.name,
//     userId: req.user._id,
//   });

//   await product.save();

//   res.status(200).json({ message: "Product review added." });
// });

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  //   reviewProduct,
};
