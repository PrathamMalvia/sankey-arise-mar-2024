const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    // Get token from the header
    const headerObj = req.headers;
    if (!headerObj.authorization) {
        return res.json({ error: "Authorization header is missing" });
    }

    const token = headerObj.authorization.split(" ")[1];
    console.log(token);

    // Verify token
    const verifyToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
        if (err) {
            console.log(err);
            return false;
        }
        else {
            return decoded;
        }
    })
    if (verifyToken) {
        req.user = verifyToken.id;
        next();
    }
    else {
        const err = new Error("Token expired please login again");
        next(err);
    }
}

module.exports = isAuthenticated;
