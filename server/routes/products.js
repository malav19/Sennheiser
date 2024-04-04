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
// Middleware to check if the user is an admin
// const isAdmin = (req, res, next) => {
//     const userType = req.headers['usertype']; // Assuming usertype is sent in the request headers
//     if (userType === 'admin') {
//         next(); // Allow access to the route
//     } else {
//         res.status(403).send('Unauthorized'); // User is not an admin
//     }
// };, isAdmin
router.post("/addproduct", upload.single('image'), addProducts);
router.get("/getproducts", getProducts);
router.put("/updateproduct", upload.single('image'), updateProduct);
router.delete("/deleteproducts", deleteProduct);
router.post("/addproduct",)
module.exports = router;