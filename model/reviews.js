const {Schema, model} = require("mongoose");

const reviewSchema = new Schema({
    content :{
        type:String,
        required:true,
    },
    averageRating:{
        type:Number,
        min:0,
        max:5,
        default:0
    },
    bookId :{
        type : Schema.Types.ObjectId,
        ref : "books",
    },
    createdBy :{
        type : Schema.Types.ObjectId,
        ref : "user",
    }
},{ timestamps: true })

const Reviews = model("review",reviewSchema);

module.exports = Reviews;