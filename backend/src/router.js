const express = require("express");

const router = express.Router();

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const parentControllers = require("./controllers/parentControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);
router.post("/parents", parentControllers.post);

/* ************************************************************************* */

module.exports = router;
