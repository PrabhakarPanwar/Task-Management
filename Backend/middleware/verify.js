import jwt from "jsonwebtoken";

const verify = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch {
    res.json({
      success: false,
      error: "Invalid or expired token. Please Login again.",
    });
  }
};

export default verify;
