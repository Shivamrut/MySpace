const jwt = require("jsonwebtoken");
const JWT_KEY = "MYSECRETKEY";

const fetchUserId = (req, res, next) => {
  try {
    const token = req.header("token");
    if(!token){
      throw new Error("No token provided!")
    }
    const data = jwt.verify(token,JWT_KEY)
    req.user = data.user
    next()
  } catch (error) {
    res.json({
        error : "JsonWebTokenError",
        message : error.message==="jwt malformed"?"Invalid Token":error.message
    })
  }
};

module.exports = fetchUserId