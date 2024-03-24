const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "./public/uploads" });

const parentControllers = require("./controllers/parentControllers");
const nurseryControllers = require("./controllers/nurseryControllers");
const childrenControllers = require("./controllers/childrenControllers");
const bookingControllers = require("./controllers/bookingControllers");
const administrativeControllers = require("./controllers/administrativeControllers");
const userControllers = require("./controllers/userControllers");
const uploadControllers = require("./controllers/uploadControllers");
const { authMiddleware } = require("./middlewares/auth/auth.middleware");
const { allowParentMiddleware, matchParentIdMiddleware, matchChildrenIdMiddleware } = require("./middlewares/roles/allow-parent.middleware");
const { allowNurseryMiddleware, matchNurseryIdMiddleware } = require("./middlewares/roles/allow-nursery.middleware");



// Routes Allowed for everyone
router.post("/register/parent", userControllers.register);
router.post("/register/nursery", userControllers.registerNursery);
router.post("/login", userControllers.login);

router.post("/administrative", administrativeControllers.post);
router.post("/children", childrenControllers.post);
router.post("/parents", parentControllers.post);
router.post("/nursery", nurseryControllers.post);

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

router.post(
  "/upload-nursery-picture/:nurseryId",
  upload.single("NurseryPicture"),
  uploadControllers.createNurseryPicture
);

router.post(
  "/upload-parent-avatar/:parentId",
  upload.single("Avatar"),
  uploadControllers.createAvatar
);

// Mur de middleware : s'ajoute à toutes les routes ci-dessous. 
router.use(authMiddleware);

// Route for parents
router.get("/parents/:id", allowParentMiddleware, matchParentIdMiddleware, parentControllers.get);
router.put("/parents/:id", allowParentMiddleware, matchParentIdMiddleware, parentControllers.put);
router.delete("/parents/:id", allowParentMiddleware, matchParentIdMiddleware, parentControllers.deleteParent);

// Route for nursery
router.get("/nursery/:id", nurseryControllers.get);
router.get("/nurseries", nurseryControllers.getAll);
router.put("/nursery/:id", allowNurseryMiddleware, matchNurseryIdMiddleware, nurseryControllers.put);

// Route for children
router.get("/children/:id", childrenControllers.get);
router.put("/children/:id", childrenControllers.put);

// Route for booking
router.get("/booking/:childrenId", matchChildrenIdMiddleware, bookingControllers.getByChildrenId);
router.get("/booking/nursery/:nurseryId", matchNurseryIdMiddleware, bookingControllers.getByNurseryId);
router.post("/booking", allowParentMiddleware, bookingControllers.post);
router.post("/booking/availability/:nurseryId", allowParentMiddleware, bookingControllers.checkAvailability);
router.put("/booking/:bookingId/:nurseryId", allowNurseryMiddleware, matchNurseryIdMiddleware, bookingControllers.put);
router.delete("/booking/:id", allowNurseryMiddleware, matchNurseryIdMiddleware, bookingControllers.deleteBooking);

// Route for Admnistrative
router.get("/administrative/:id", administrativeControllers.get); // toutes les cr!che + le parent en question
router.put("/administrative/:id", administrativeControllers.put); // que le parent en question

module.exports = router;