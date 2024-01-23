const express = require("express");
const multer = require("multer");
const fs = require("node:fs");
const generateUUID = require("./utils/uuid-generator");

const router = express.Router();
const upload = multer({ dest: "./public/uploads" });

// Import itemControllers module for handling item-related operations
const parentControllers = require("./controllers/parentControllers");
const nurseryControllers = require("./controllers/nurseryControllers");
const childrenControllers = require("./controllers/childrenControllers");
const bookingControllers = require("./controllers/bookingControllers");
const administrativeControllers = require("./controllers/administrativeControllers");
const dateControllers = require("./controllers/dateControllers");
const userControllers = require("./controllers/userControllers");

// // Route to get a list of items
// router.get("/items", itemControllers.browse);

// // Route to get a specific item by ID
// router.get("/items/:id", itemControllers.read);

// // Route to add a new item
// router.post("/items", itemControllers.add);

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

router.post("/uploadincome", upload.single("incomeProofUrl"), (req, res) => {
  const { originalname, filename } = req.file;
  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${generateUUID()}-${originalname}`,
    (err) => {
      if (err) throw err;
      res.send("image ok");
    }
  );
});
router.post(
  "/uploadphoto",
  upload.single("PhotoVideoPermission"),
  (req, res) => {
    const { originalname, filename } = req.file;
    fs.rename(
      `./public/uploads/${filename}`,
      `./public/uploads/${generateUUID()}-${originalname}`,
      (err) => {
        if (err) throw err;
        res.send("image ok");
      }
    );
  }
);
router.post(
  "/uploadoutside",
  upload.single("OutsidePermission"),
  (req, res) => {
    const { originalname, filename } = req.file;
    fs.rename(
      `./public/uploads/${filename}`,
      `./public/uploads/${generateUUID()}-${originalname}`,
      (err) => {
        if (err) throw err;
        res.send("image ok");
      }
    );
  }
);

// router.post("/upload", upload.array("files", 3), (req, res) => {
//   const fileList = req.files;
//   fileList.forEach((file) => {
//     const { filename, originalname } = file;
//     fs.rename(
//       `./public/uploads/${filename}`,
//       `./public/uploads/${generateUUID()}-${originalname}`,
//       (err) => {
//         if (err) throw err;
//       }
//     );
//   });
//   res.send("image ok");
// });

module.exports = router;
