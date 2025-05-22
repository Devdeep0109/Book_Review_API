const {Schema,model} = require("mongoose");


const booksSchema = new Schema({

    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:String
    },
    description:{
        type:String,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
    
},{timestamps:true});

const Books = model("books", booksSchema);
module.exports = Books;