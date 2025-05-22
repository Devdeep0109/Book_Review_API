require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute.js");
const booksRoute = require("./routes/booksRoute.js");
const reviewRoute = require("./routes/reviewRoute.js");

// connecting to MongoDB database
mongoose.connect(process.env.MONGODB_URL)
.then( async() =>{
    console.log("Connected to Database");
})
.catch(error => console.log(error))


//middlewares.........
app.use(express.json());


// routes.......
app.use("/",userRoute);
app.use("/books",booksRoute);
app.use("/reviews",reviewRoute);

app.listen(port, (req,res) =>{
    console.log(`Listening to port no. ${port}`);
})

