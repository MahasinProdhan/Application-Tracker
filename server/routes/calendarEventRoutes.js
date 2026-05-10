import express from "express";
import { body } from "express-validator";
import {
  createCalendarEvent,
  deleteCalendarEvent,
  getCalendarEventById,
  getCalendarEvents,
  updateCalendarEvent,
} from "../controllers/calendarEventController.js";
import { protect } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import { calendarEventTypes } from "../models/CalendarEvent.js";

const router = express.Router();

const calendarEventValidation = [
  body("title").trim().notEmpty().withMessage("Event title is required"),
  body("company").trim().notEmpty().withMessage("Company name is required"),
  body("type").isIn(calendarEventTypes).withMessage("Invalid event type"),
  body("date")
    .trim()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Event date is required"),
  body("time")
    .optional({ values: "falsy" })
    .matches(/^([01]\d|2[0-3]):[0-5]\d$/)
    .withMessage("Event time must be valid"),
  validateRequest,
];

router.use(protect);
router.get("/", getCalendarEvents);
router.get("/:id", getCalendarEventById);
router.post("/", calendarEventValidation, createCalendarEvent);
router.put("/:id", calendarEventValidation, updateCalendarEvent);
router.delete("/:id", deleteCalendarEvent);

export default router;
