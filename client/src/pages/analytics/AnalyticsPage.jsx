import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import MonthlyChart from "../../components/charts/MonthlyChart";
import StatusChart from "../../components/charts/StatusChart";
import { getDashboardRequest } from "../../services/dashboardService";

const AnalyticsPage = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboardRequest();
        setDashboard(data);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <Loader text="Loading analytics..." />;
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-app-text">Analytics</h2>
        <p className="mt-1 text-sm text-app-muted">
          Visualize application momentum and status distribution across your search.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <StatusChart data={dashboard?.statusBreakdown || []} />
        <MonthlyChart data={dashboard?.monthlyApplications || []} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
