import jwt from "jsonwebtoken";

const JWT_SECRET = "MisbahFarooqui123456";
const generateToken = (user) => {
  return jwt.sign({ user }, JWT_SECRET, {
    expiresIn: "30d",
  });
};
export default generateToken;
