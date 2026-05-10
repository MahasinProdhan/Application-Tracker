import { useEffect, useState } from "react";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import KanbanBoard from "../../components/kanban/KanbanBoard";
import { getApplicationsRequest } from "../../services/applicationService";

const KanbanPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await getApplicationsRequest({});
        setApplications(data.applications);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  if (loading) {
    return <Loader text="Building your board..." />;
  }

  if (!applications.length) {
    return (
      <EmptyState
        title="Your board is empty"
        description="Applications automatically appear here so you can see your pipeline flow stage by stage."
      />
    );
  }

  return <KanbanBoard applications={applications} />;
};

export default KanbanPage;
