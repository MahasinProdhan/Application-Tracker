import CalendarEvent from "../models/CalendarEvent.js";
import asyncHandler from "../utils/asyncHandler.js";

const pickCalendarEventFields = (body) => ({
  title: body.title,
  company: body.company,
  type: body.type,
  date: body.date,
  time: body.time || "",
  notes: body.notes || "",
});

export const getCalendarEvents = asyncHandler(async (req, res) => {
  const events = await CalendarEvent.find({ userId: req.user._id }).sort({
    date: 1,
    time: 1,
    createdAt: 1,
  });

  res.json({ events });
});

export const getCalendarEventById = asyncHandler(async (req, res) => {
  const event = await CalendarEvent.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!event) {
    const error = new Error("Calendar event not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({ event });
});

export const createCalendarEvent = asyncHandler(async (req, res) => {
  const event = await CalendarEvent.create({
    ...pickCalendarEventFields(req.body),
    userId: req.user._id,
  });

  res.status(201).json({
    message: "Calendar event created successfully",
    event,
  });
});

export const updateCalendarEvent = asyncHandler(async (req, res) => {
  const event = await CalendarEvent.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    pickCalendarEventFields(req.body),
    { new: true, runValidators: true }
  );

  if (!event) {
    const error = new Error("Calendar event not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({
    message: "Calendar event updated successfully",
    event,
  });
});

export const deleteCalendarEvent = asyncHandler(async (req, res) => {
  const event = await CalendarEvent.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!event) {
    const error = new Error("Calendar event not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({ message: "Calendar event deleted successfully" });
});
