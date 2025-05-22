const express = require("express");
const router = express.Router();
const {signupController,loginController}  = require("../controller/userController");
const { searchBooks } = require("../controller/booksController");


router.post("/signup", signupController);

router.post("/login",loginController);

//addition search of books using keyword..
router.get("/search",searchBooks);

module.exports= router;
