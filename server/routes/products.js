const { addProducts, getProducts } = require("../controllers/productsController");
const router = require("express").Router();

router.post("/addproduct", addProducts);
router.get("/getproducts", getProducts);
// router.put('/updateproduct', updateProduct);
// router.delete('/deleteproduct', deleteProduct);

module.exports = router;