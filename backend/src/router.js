const express = require("express");

const router = express.Router();

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const parentControllers = require("./controllers/parentControllers");
const nurseryControllers = require("./controllers/nurseryControllers");

// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

// Route for parents
router.get("/parents/:id", parentControllers.get);
router.post("/parents", parentControllers.post);
router.put("/parents/:id", parentControllers.put);

// Route for nursery
router.get("/nursery/:id", nurseryControllers.get);
router.post("/nursery", nurseryControllers.post);
router.put("/nursery/:id", nurseryControllers.put);

module.exports = router;
