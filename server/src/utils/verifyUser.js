const jwt = require("jsonwebtoken");
const { errorHandler } = require("./error.js");

const verifyUser = (req, res, next) => {
    try {  
        const token = req?.cookies?.access_token;
        if (!token) {
            return next(errorHandler(401, "You are not authorized"));
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return next(errorHandler(403, "Token is not valid"));
            }
            req.user = user;
            next();
        });
    } catch (err) {
        console.log("err:", err);
    }
}

module.exports = { verifyUser }