const jwt = require("jsonwebtoken");
const debug = require("debug")("gsc-backend:middleware:checkToken");

function checkToken(req, res, next) {
  // Check for the token being sent in a header or as a query parameter
  let token = req.get("Authorization") || req.query.token;
  if (token) {
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace("Bearer ", "");
    // Check if token is valid and not expired
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      debug("decoded user request header: %o", decoded);
      // If valid token, decoded will be the token's entire payload
      // If invalid token, err will be set
      req.user = err ? res.status(401).json({ err }) : decoded.user;
      // If your app cares... (optional)
      req.exp = err ? null : new Date(decoded.exp * 1000);
      return next();
    });
  } else {
    // No token was sent
    req.user = null;
    return next();
  }
};

module.exports = checkToken