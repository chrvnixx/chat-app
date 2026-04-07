import cloudinary from "../config/cloudniary.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export async function signup(req, res) {
  const { email, password, fullName } = req.body;
  try {
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({
      fullName,
      email,
      password,
    });
    await user.save();

    generateToken(user._id, res);
    res.status(201).json({
      message: "User created",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
    console.log("Error in signup controller", error);
  }
}
export async function login(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Fill the required fields" });
    }
    const user = await User.findOne({ email });
    const checkPass = await user.comparePassword(password);

    if (user && checkPass) {
      generateToken(user._id, res);
      return res.status(200).json({
        message: "logged in",
        user: { ...user._doc, password: undefined },
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.log("Error in login controller", error);
  }
}
export async function logout(req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "logged out" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.log("Error in login controller");
  }
}

export async function updateProfile(req, res) {
  try {
    const { profilePic } = req.body;

    const userId = req.user._id;

    if (!profilePic) {
      return res.status(404).json({ message: "profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true },
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.log("Error in update Profile controller");
  }
}

export async function checkAuth(req, res) {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.log("Error in login controller");
  }
}
