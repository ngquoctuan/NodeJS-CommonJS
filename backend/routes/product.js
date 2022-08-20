// const productController = require('../Controllers/Controller');

const productController = require('../controllers/productController');

const router = require('express').Router();

// ADD A PRODUCT
router.post("/", productController.addAProduct);

// GET ALL PRODUCTS
router.get("/", productController.getAllProducts);

//GET A PRODUCT
router.get("/:id", productController.getProductID);

//UPDATE A PRODUCT
router.put("/:id", productController.updateProduct);

//DELETE A PRODUCT
router.delete("/:id", productController.deleteProduct);

module.exports = router;