const express = require("express");
const router = express.Router();

/**
 * Import routes
 */
const userRoutes = require("./api/user");

/**
 * Import controllers
 */
const userController = require("../controllers/user");

/**
 * Import middlewares
 */
const schemaValidator = require("../middlewares/schemaValidator");

// Auth routes
router.post("/signup", schemaValidator.createUserSchema, userController.signup);
router.post("/login", schemaValidator.loginUserSchema, userController.login);

router.use("/secure/users", userRoutes);

module.exports = router