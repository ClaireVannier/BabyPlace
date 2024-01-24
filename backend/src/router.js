const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "./public/uploads" });

const parentControllers = require("./controllers/parentControllers");
const nurseryControllers = require("./controllers/nurseryControllers");
const childrenControllers = require("./controllers/childrenControllers");
const bookingControllers = require("./controllers/bookingControllers");
const administrativeControllers = require("./controllers/administrativeControllers");
const dateControllers = require("./controllers/dateControllers");
const userControllers = require("./controllers/userControllers");
const uploadControllers = require("./controllers/uploadControllers");

// Route for parents
router.get("/parents/:id", parentControllers.get);
router.post("/parents", parentControllers.post); //  ok ca marche
router.put("/parents/:id", parentControllers.put);

// Route for nursery
router.get("/nursery/:id", nurseryControllers.get);
router.post("/nursery", nurseryControllers.post); // ok ca marche
router.put("/nursery/:id", nurseryControllers.put);

// Route for children
router.get("/children/:id", childrenControllers.get);
router.post("/children", childrenControllers.post); // ok ca marche
router.put("/children/:id", childrenControllers.put);

// Route for booking
router.get("/booking/:id", bookingControllers.get);
router.post("/booking", bookingControllers.post);
router.put("/booking/:id", bookingControllers.put);
router.delete("/booking/:id", bookingControllers.deleteBooking);

// Route for Admnistrative
router.get("/administrative/:id", administrativeControllers.get);
router.post("/administrative", administrativeControllers.post); // ca marche sur postman
router.put("/administrative/:id", administrativeControllers.put);

// Route for date

router.get("/date/:id", dateControllers.get);
router.post("/date", dateControllers.post);
router.put("/date/:id", dateControllers.put);
router.delete("/date/:id", dateControllers.deletedate);

// Route for User
// ok les 3 marchent
router.post("/register", userControllers.register);
router.post("/register/pro", userControllers.registerPro);

router.post("/login", userControllers.login);

// route for upload un fichier
/**
 * 
 */
router.post(
  "/upload-income/:id",
  upload.single("incomeProofUrl"),
  uploadControllers.createIncome
);

router.post(
  "/upload-photo/:id",
  upload.single("PhotoVideoPermission"),
  uploadControllers.createPhoto
);

router.post(
  "/upload-outside-permission/:id",
  upload.single("OutsidePermission"),
  uploadControllers.createOutsitePermission
);

module.exports = router;
