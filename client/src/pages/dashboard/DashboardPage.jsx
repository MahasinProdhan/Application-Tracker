import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ApplicationFormModal from "../../components/applications/ApplicationFormModal";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import MonthlyChart from "../../components/charts/MonthlyChart";
import StatusChart from "../../components/charts/StatusChart";
import ApplicationActivityHeatmap from "../../components/dashboard/ApplicationActivityHeatmap";
import RecentApplications from "../../components/dashboard/RecentApplications";
import StatCard from "../../components/dashboard/StatCard";
import { createApplicationRequest } from "../../services/applicationService";
import { getDashboardRequest } from "../../services/dashboardService";

const DashboardPage = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardRequest();
      setDashboard(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await createApplicationRequest(formData);
      toast.success("Application created successfully");
      setIsModalOpen(false);
      loadDashboard();
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader text="Loading dashboard..." />;
  }

  if (!dashboard?.summary?.totalApplications) {
    return (
      <>
        <EmptyState
          title="No applications yet"
          description="Start adding applications to unlock dashboard insights, trends, and pipeline visibility."
          onAction={() => setIsModalOpen(true)}
        />
        <ApplicationFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          currentApplication={null}
          mode="create"
          submitting={submitting}
        />
      </>
    );
  }

  return (
    <div className="space-y-4">
      <section className="flex flex-col gap-1">
        {/* <h2 className="text-3xl font-bold tracking-tight text-app-text">Dashboard</h2>
        <p className="text-sm text-app-muted">Overview of your career pipeline.</p> */}
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <StatCard
          title="Total applications"
          value={dashboard.summary.totalApplications}
          hint="Every role you are tracking"
        />
        <StatCard
          title="Rejected"
          value={dashboard.summary.totalRejected}
          hint="Useful feedback for iteration"
        />
        <StatCard
          title="Shortlisted"
          value={dashboard.summary.totalShortlisted}
          hint="Companies showing interest"
        />
        <StatCard
          title="Interview stages"
          value={dashboard.summary.totalInterviews}
          hint="Active conversations in progress"
        />
        <StatCard
          title="Offers"
          value={dashboard.summary.totalOffers}
          hint="Potential wins in hand"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <StatusChart data={dashboard.statusBreakdown} />
        <MonthlyChart data={dashboard.monthlyApplications} />
      </div>

      <ApplicationActivityHeatmap
        activity={dashboard.applicationActivity}
        totalApplications={dashboard.summary.totalApplications}
      />

      <RecentApplications items={dashboard.recentApplications} />
    </div>
  );
};

export default DashboardPage;
