const authController = require("../controllers/authController");
const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController");
const router = require("express").Router();

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
router.post('/update',userController.updateUser);

//FORGET PASSWORD
router.post('/forget',userController.forgetPassword);

//RESET PASSWORD
router.post("/reset", userController.resetPasswordAPI );

module.exports = router;