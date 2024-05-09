const express = require("express");
const userController = require("../controllers/usersController");
const isAuthenticated = require("../middlewares/Auth");

const router = express.Router();

router.post("/api/users/register", userController.register);
router.post("/api/users/login", userController.login);
router.get("/api/users/profile", isAuthenticated, userController.profile);

router.get("/api/users", userController.getAllUsers);
router.get("/api/users/:userId", userController.getUser);
router.put("/api/users/:userId", userController.updateUser);
router.delete("/api/users/:userId", userController.deleteUser);

module.exports = router;
