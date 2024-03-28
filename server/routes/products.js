const { addProducts, getProducts, deleteProduct, updateProduct } = require("../controllers/productsController");
const router = require("express").Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});
const upload = multer({ storage: storage });

router.post("/addproduct", upload.single('image'), addProducts);
router.get("/getproducts", getProducts);
router.put("/updateproduct", upload.single('image'), updateProduct);
router.delete("/deleteproducts", deleteProduct);

module.exports = router;