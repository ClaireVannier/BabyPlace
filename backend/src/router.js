const express = require("express");

const router = express.Router();

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
const parentControllers = require("./controllers/parentControllers");
const nurseryControllers = require("./controllers/nurseryControllers");
const childrenControllers = require("./controllers/childrenControllers");
const bookingControllers = require("./controllers/bookingControllers");
const administrativeControllers = require("./controllers/administrativeControllers");

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

// Route for children
router.get("/children/:id", childrenControllers.get);
router.post("/children", childrenControllers.post);
router.put("/children/:id", childrenControllers.put);

// Route for booking
router.get("/booking/:id", bookingControllers.get);
router.post("/booking", bookingControllers.post);
router.put("/booking/:id", bookingControllers.put);
router.delete("/booking/:id", bookingControllers.deleteBooking);

// Route for AdmnistrativeRecord

router.get("/administrative/:id", administrativeControllers.get);
router.post("/administrative", administrativeControllers.post);
router.put("/administrative/:id", administrativeControllers.put);

module.exports = router;
