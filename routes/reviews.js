const express = require("express");
// Add mergeParams to ensure :id in the route prefix can be accessed as req.params.id
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isReviewAuthor, validateReview } = require("../middleware");
const reviews = require("../controllers/reviews");
const catchAsync = require("../utils/catch-async");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
