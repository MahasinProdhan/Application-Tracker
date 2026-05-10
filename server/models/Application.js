import mongoose from "mongoose";

export const applicationStatuses = [
  "Applied",
  "OA Scheduled",
  "OA Cleared",
  "Shortlisted",
  "Interview Scheduled",
  "HR Round",
  "Technical Round",
  "Final Round",
  "Rejected",
  "Ghosted",
  "Offer Received",
  "Accepted",
];

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    salary: {
      type: String,
      trim: true,
      default: "",
    },
    platform: {
      type: String,
      trim: true,
      default: "",
    },
    appliedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: applicationStatuses,
      default: "Applied",
    },
    interviewDate: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    jobLink: {
      type: String,
      trim: true,
      default: "",
    },
    resumeVersion: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
