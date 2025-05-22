require("dotenv").config();

const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;


function createTokenForUser(user){
    // console.log("User passed to createTokenForUser:", user);
    
    const payload = {
        _id : user._id,
        email:user.email,
        username:user.username
    }
    const token = jwt.sign(payload,secret,{expiresIn: "2d"});  // token will expire in 2 days
    return token;
}

function validateToken(token){

    try{
        return jwt.verify(token,secret);
    }
    catch(error){
        return {
            error:"Invalid or expired token"
        };
    }
}

module.exports = {createTokenForUser, validateToken};
