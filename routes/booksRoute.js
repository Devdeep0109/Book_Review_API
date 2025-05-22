const express = require("express");
const { allBooks, addBook, bookFullDetails } = require("../controller/booksController");
const {submitReview} = require("../controller/reviewController");
const router = express.Router();
const {checkForAuthenticationCookie} = require("../middlewares/authMiddleware");


router.get("/",allBooks);
router.post("/",checkForAuthenticationCookie(),addBook);
router.get("/:id",bookFullDetails);
router.post("/:id/reviews",checkForAuthenticationCookie(), submitReview);

module.exports = router;