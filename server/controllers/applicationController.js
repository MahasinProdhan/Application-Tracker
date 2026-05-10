import Application from "../models/Application.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getApplications = asyncHandler(async (req, res) => {
  const { search = "", status = "all", sort = "desc" } = req.query;

  const query = {
    userId: req.user._id,
    companyName: { $regex: search, $options: "i" },
  };

  if (status !== "all") {
    query.status = status;
  }

  const applications = await Application.find(query).sort({
    appliedDate: sort === "asc" ? 1 : -1,
  });

  res.json({ applications });
});

export const getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!application) {
    const error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({ application });
});

export const createApplication = asyncHandler(async (req, res) => {
  const application = await Application.create({
    ...req.body,
    userId: req.user._id,
  });

  res.status(201).json({
    message: "Application created successfully",
    application,
  });
});

export const updateApplication = asyncHandler(async (req, res) => {
  const application = await Application.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!application) {
    const error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({
    message: "Application updated successfully",
    application,
  });
});

export const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!application) {
    const error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({ message: "Application deleted successfully" });
});
