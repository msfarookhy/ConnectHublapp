
import generateToken from "../utils/generateToken.mjs";
import User from "../models/userModel.mjs";
import asyncHandler from "express-async-handler";

// Auth user & get token POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user),
    });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const data = req.body;
  data.city = data.city.value;
  data.state = data.state.value;

  if (!data.gender) {
    return res.status(400).json({ message: "Gender is required" });
  }

  data.heardAbout = Object.keys(data.heardAbout)
    .filter((key) => data.heardAbout[key] === true)
    .join(", ");

  const userExists = await User.findOne({ email: data.email });
  if (userExists) {
    return res.status(401).json({ message: "User Already Exists" });
  }

  const user = await User.create(data);
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user),
    });
  } else {
    return res.status(400).json({ message: "User Not Found" });
  }
});

export { authUser, registerUser };

