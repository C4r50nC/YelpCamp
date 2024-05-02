const express = require("express");
const router = express.Router();
const { isAuthor, isLoggedIn, validateCampground } = require("../middleware");
const catchAsync = require("../utils/catch-async");
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const storage = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(upload.single("image"), (req, res) => {
    console.log(req.body, req.files);
    res.send("Image upload process complete");
  });
// .post(
//   isLoggedIn,
//   validateCampground,
//   catchAsync(campgrounds.createCampground)
// );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);
// Place before :id route to avoid "new" being read as ID

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
