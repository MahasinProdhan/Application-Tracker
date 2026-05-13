import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const attachTokenCookie = (res, userId) => {
  const token = jwt.sign({ userId: userId.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  res.cookie("token", token, cookieOptions);
  return token;
};

export const clearTokenCookie = (res) => {
  res.cookie("token", "", {
    ...cookieOptions,
    maxAge: 0,
  });
};
