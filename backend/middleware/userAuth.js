const jwt = require("jsonwebtoken");

function userAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token)
    return res.status(401).json({ message: "Please log in to continue" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "customer") throw new Error("Invalid customer token");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired login" });
  }
}

module.exports = userAuth;
