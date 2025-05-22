const {validateToken} = require("../service/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
      try {
        let token = req.header("Authorization");
  
        if (!token) {
          console.warn("Authorization header missing");
          return next(); // let the route decide if auth is mandatory
        }
  
        if (token.startsWith("Bearer ")) {
          token = token.slice(7).trim();
        }
  
        if (!token) {
          console.warn("Token value is empty after trimming");
          return next();
        }
  
        const userPayload = validateToken(token);
        req.user = userPayload;
  
        console.log("Authenticated user:", userPayload);
        next();
      } catch (error) {
        console.error("Authentication error:", error.message);
        next(); // let the route decide
      }
    };
  }

module.exports = {checkForAuthenticationCookie}