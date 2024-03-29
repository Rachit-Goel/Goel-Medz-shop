const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
    console.log("post-carts/ call success");
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
    console.log("put-carts/:id call success");
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/product/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    // await Cart.deleteMany({ userId: req.params.id, products: [productId: req.body.pid] });
    res.status(200).json("product from cart has been deleted...");
    console.log("delete-carts/product/:id call success");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.params.id });
    res.status(200).json("Cart has been deleted...");
    console.log("delete-carts/:id call success");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.id });
    res.status(200).json(cart);
    console.log("get-carts/find/:id call success");
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
    console.log("get-carts/ call success");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
