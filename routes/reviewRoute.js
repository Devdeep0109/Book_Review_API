
const express = require("express");
const router = express.Router();
const {updateReview,deleteReview} = require("../controller/reviewController");
const { checkForAuthenticationCookie } = require("../middlewares/authMiddleware");

router.put("/:id",checkForAuthenticationCookie(),updateReview);
router.delete("/:id",checkForAuthenticationCookie(),deleteReview);

module.exports = router;