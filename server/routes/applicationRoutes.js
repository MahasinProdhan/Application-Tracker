import express from "express";
import { body } from "express-validator";
import {
  createApplication,
  deleteApplication,
  getApplicationById,
  getApplications,
  updateApplication,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import { applicationStatuses } from "../models/Application.js";

const router = express.Router();

const applicationValidation = [
  body("companyName").trim().notEmpty().withMessage("Company name is required"),
  body("role").trim().notEmpty().withMessage("Role is required"),
  body("appliedDate").notEmpty().withMessage("Applied date is required"),
  body("status")
    .optional()
    .isIn(applicationStatuses)
    .withMessage("Invalid application status"),
  body("jobLink").optional({ values: "falsy" }).isURL().withMessage("Job link must be a valid URL"),
  validateRequest,
];

router.use(protect);
router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.post("/", applicationValidation, createApplication);
router.put("/:id", applicationValidation, updateApplication);
router.delete("/:id", deleteApplication);

export default router;
