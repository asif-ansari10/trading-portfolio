import jwt from "jsonwebtoken";

export const verifyToken = (req) => {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};
