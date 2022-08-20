const authController = require("../middlewarecontroller/authController");
const middlewareController = require("../middlewarecontroller/middlewareController");
const uploadFile = require("../middlewarecontroller/uploadFile");
const userController = require("../controllers/userController");
const router = require("express").Router();
const feature = require("../middlewarecontroller/features");

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

//CREATE AVATAR USER
router.post("/avatar", middlewareController.verifyToken, uploadFile.single("Avatar"), userController.createAvatar);

//GET AVATAR USER
router.get("/avatar/:id", middlewareController.verifyToken, userController.getAvatar);

//DELETE AVATAR USER
router.delete("/avatar/:id", middlewareController.verifyToken, userController.deleteAvatar);

//PAGING_FUNC
router.get('/user', feature.pagingFunc);

//SORT_FUNCTION
router.get('/sort', feature.sortingFunc);

module.exports = router;