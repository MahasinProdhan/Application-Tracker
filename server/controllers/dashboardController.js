import Application from "../models/Application.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const [applications, statusCounts, monthlyCounts, dailyCounts] = await Promise.all([
    Application.find({ userId }).sort({ appliedDate: -1 }).limit(5),
    Application.aggregate([
      { $match: { userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    Application.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            year: { $year: "$appliedDate" },
            month: { $month: "$appliedDate" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]),
    Application.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$appliedDate",
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  const countsMap = statusCounts.reduce(
    (accumulator, item) => ({ ...accumulator, [item._id]: item.count }),
    {}
  );

  const totalApplications = Object.values(countsMap).reduce(
    (sum, count) => sum + count,
    0
  );

  res.json({
    summary: {
      totalApplications,
      totalRejected: countsMap.Rejected || 0,
      totalShortlisted: countsMap.Shortlisted || 0,
      totalInterviews:
        (countsMap["Interview Scheduled"] || 0) +
        (countsMap["HR Round"] || 0) +
        (countsMap["Technical Round"] || 0) +
        (countsMap["Final Round"] || 0),
      totalOffers: countsMap["Offer Received"] || 0,
    },
    recentApplications: applications,
    statusBreakdown: statusCounts.map((item) => ({
      status: item._id,
      value: item.count,
    })),
    monthlyApplications: monthlyCounts.map((item) => ({
      label: `${item._id.month}/${item._id.year}`,
      value: item.count,
    })),
    applicationActivity: dailyCounts.map((item) => ({
      date: item._id,
      value: item.count,
    })),
  });
});
