const express = require("express");
const router = new express.Router();
const controllers = require("../Controllers/usersControllers");
const upload = require("../multerconfig/storageConfig");

// Routes for different user types
router.post(
  "/doctor/register",
  upload.single("user_profile"),
  controllers.doctorPost
);
router.post(
  "/majorstaff/register",
  upload.single("user_profile"),
  controllers.majorStaffPost
);
router.post(
  "/minorstaff/register",
  upload.single("user_profile"),
  controllers.minorStaffPost
);

// Route to get all users
router.get("/user/details", controllers.userget);

// Route to get one user
router.get("/user/:id", controllers.singleuserget);

// update user details
router.put(
  "/user/edit/:id",
  upload.single("user_profile"),
  controllers.useredit
);

// delete user
router.delete("/user/delete/:id", controllers.userdelete);

// export to csv
router.get("/userexport", controllers.userExport);

module.exports = router;
