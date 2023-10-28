import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.mjs";
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = "secretIsSecret";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: "Not Authorized,Token failed",
      });
    }
  }
  if (!token) {
    res.status(401);
    return res
      .status(401)
      .json({ message: "Token Not Found Invalid Authorized" });
  }
});

export default protect;
