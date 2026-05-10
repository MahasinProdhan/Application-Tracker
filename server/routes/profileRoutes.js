import express from "express";
import { body } from "express-validator";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.use(protect);

router.get("/", getProfile);
router.put(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("currentPassword")
      .optional({ values: "falsy" })
      .isLength({ min: 6 })
      .withMessage("Current password must be at least 6 characters"),
    body("newPassword")
      .optional({ values: "falsy" })
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
    validateRequest,
  ],
  updateProfile
);

export default router;
