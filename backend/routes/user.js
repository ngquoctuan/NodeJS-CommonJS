const authController = require("../middlewarecontroller/authController");
const middlewareController = require("../middlewarecontroller/middlewareController");
const uploadFile = require("../middlewarecontroller/uploadFile");
const userController = require("../controllers/userController");
const router = require("express").Router();
const feature = require("../middlewarecontroller/features");
const user = require("../models/user");
const sharp = require("sharp");

//REGISTER
router.post("/register", middlewareController.validateInputUserAPI, authController.registerUser);

//LOG IN
router.post("/login", authController.loginUser);

// GET ALL USERS
router.get("/", middlewareController.verifyToken, userController.getAllUsers);

//DELETE USER
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

// REFRESH
router.post("/refresh", authController.reqRefreshToken);

//LOG OUT
router.post("/logout", middlewareController.verifyToken, authController.userLogout);

//UPDATE USER
router.put('/update', userController.updateUser);

//FORGET PASSWORD
router.post('/forget', userController.forgetPassword);

//RESET PASSWORD
router.post("/reset", userController.resetPasswordAPI);

//UPLOAD SINGLE FILE
router.post("/single", uploadFile.single("image"), userController.uploadSingleFile);

//UPLOAD MULTIPLE FILE
router.post('/multiple', uploadFile.array('images', 3), userController.uploadMultipleFiles);

//CREATE AVATAR USER
router.post('/create', middlewareController.verifyToken, uploadFile.single('image'), userController.createAvatar);
// router.post('/create', middlewareController.verifyToken, uploadFile.single('image'));
//GET AVATAR USER
router.get("/avatar/:id", middlewareController.verifyToken, userController.getAvatar);

//DELETE AVATAR USER
router.delete("/avatar/:id", middlewareController.verifyToken, userController.deleteAvatar);

//PAGING_FUNC
router.get('/user', feature.pagingFunc);

//SORT_FUNCTION
router.get('/sort', feature.sortingFunc);

module.exports = router;