import jwt from "jsonwebtoken";

const verify = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "No token provided. Please login.",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Session expired. Please login again.",
        location: "/login",
      });
    }
    return res.status(401).json({
      success: false,
      error: "Invalid token. Please login again.",
      location: "/login",
    });
  }
};

export default verify;
