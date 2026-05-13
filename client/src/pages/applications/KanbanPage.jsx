import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ApplicationFormModal from "../../components/applications/ApplicationFormModal";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import KanbanBoard from "../../components/kanban/KanbanBoard";
import {
  createApplicationRequest,
  getApplicationsRequest,
} from "../../services/applicationService";

const KanbanPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadApplications = async () => {
    try {
      const data = await getApplicationsRequest({});
      setApplications(data.applications);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await createApplicationRequest(formData);
      toast.success("Application created successfully");
      setIsModalOpen(false);
      loadApplications();
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader text="Building your board..." />;
  }

  if (!applications.length) {
    return (
      <>
        <EmptyState
          title="Your board is empty"
          description="Applications automatically appear here so you can see your pipeline flow stage by stage."
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

  return <KanbanBoard applications={applications} />;
};

export default KanbanPage;
