const router = require('express').Router();

const userController = require('../controllers/userController');
const middlewareController = require("../controllers/middlewareContrroller");

// GET ALL USERS
router.get("/", middlewareController.verifyToken, userController.getAllUsers);

//DELETE USER
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = router;