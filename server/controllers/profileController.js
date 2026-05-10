import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getProfile = asyncHandler(async (req, res) => {
  res.json({
    profile: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      createdAt: req.user.createdAt,
    },
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, currentPassword, newPassword } = req.body;

  const duplicateEmailUser = await User.findOne({
    email,
    _id: { $ne: req.user._id },
  });

  if (duplicateEmailUser) {
    const error = new Error("Email already in use");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  user.name = name;
  user.email = email;

  if (newPassword) {
    if (!currentPassword) {
      const error = new Error("Current password is required to set a new password");
      error.statusCode = 400;
      throw error;
    }

    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      const error = new Error("Current password is incorrect");
      error.statusCode = 400;
      throw error;
    }

    user.password = newPassword;
  }

  await user.save();

  res.json({
    message: newPassword
      ? "Profile and password updated successfully"
      : "Profile updated successfully",
    profile: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
  });
});
