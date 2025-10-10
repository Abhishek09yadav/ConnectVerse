import jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });
    }

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    req.user = verified;
    // console.log("user data in middleware",req.user);
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Token verification failed, authorization denied" });
  }
};
