const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user");

/**
 * Import middlewares
 */
const schemaValidator = require("../../middlewares/schemaValidator");

router.get("/:id", userController.get);
router.put("/:id", schemaValidator.updateUserSchema, userController.update);
router.delete("/:id", userController.remove);

module.exports = router;