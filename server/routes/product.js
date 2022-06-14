const router = require("express").Router();
const {
    verifyTokenAndAdmin
} = require("./verifyToken");
const Product = require("../models/Product");

// create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

// update   
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

// delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product deleted");
    } catch (error) {
        res.status(500).json(error);
    }
});

// get product
router.get("/:productId", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const product = await Product.findById(req.params.productId);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get all products
router.get("/", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const queryNew = req.query.new;
    const queryCategory = req.query.category;

    try {
        let products;
        if (queryNew) {
            products = await Product.find().sort({createdAt: -1}).limit(5);
        } else if (queryCategory) {
            /* products = await Product.find({categories: {
                $in: [queryCategory]
            }}); */
            products = await Product.find({category: queryCategory});
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;