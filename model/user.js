const {randomBytes, createHmac} = require('crypto');
const {Schema , model} = require("mongoose");
const {createTokenForUser} = require("../service/authentication");
const userSchema =  new Schema({

    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});


//hashing the password...
userSchema.pre( "save", function (next){

    const user = this;

    if(!user.isModified("password")){
        return next();
    }
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = createHmac("sha256",salt).update(user.password).digest("hex");

    user.salt=salt;
    user.password = hashedPassword;

    next();
});

userSchema.static("matchPasswordAndCreateToken" ,async function(email,password){

    const user = await this.findOne({email});

    if(!user){
        return {success: false, error:"user not found"};
    }

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256",salt)
    .update(password)
    .digest("hex");

    if(hashedPassword != userProvidedHash){
        return {success:false, error:"wrong Password"};
    }

    try {
        const token = createTokenForUser(user);
        return { success: true, token };
    } 
    catch (error) {
        return { success: false, error: "Token generation failed" };
    }
})


const User = model("user",userSchema);

module.exports = User;