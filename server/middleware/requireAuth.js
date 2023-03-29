const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// middleware that restricts access only to users who have already logged in
const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(id);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
