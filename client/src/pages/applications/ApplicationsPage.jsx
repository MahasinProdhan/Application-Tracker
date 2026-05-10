import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ApplicationFormModal from "../../components/applications/ApplicationFormModal";
import ApplicationsTable from "../../components/applications/ApplicationsTable";
import FilterBar from "../../components/applications/FilterBar";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import {
  createApplicationRequest,
  deleteApplicationRequest,
  getApplicationsRequest,
  updateApplicationRequest,
} from "../../services/applicationService";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    sort: "desc",
  });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await getApplicationsRequest(filters);
      setApplications(data.applications);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [filters.search, filters.sort, filters.status]);

  const handleCreateClick = () => {
    setCurrentApplication(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (application) => {
    setCurrentApplication(application);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteApplicationRequest(id);
    toast.success("Application deleted successfully");
    loadApplications();
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      if (currentApplication) {
        await updateApplicationRequest(currentApplication._id, formData);
        toast.success("Application updated successfully");
      } else {
        await createApplicationRequest(formData);
        toast.success("Application created successfully");
      }
      setIsModalOpen(false);
      setCurrentApplication(null);
      loadApplications();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <FilterBar
        search={filters.search}
        status={filters.status}
        sort={filters.sort}
        onSearchChange={(search) => setFilters((current) => ({ ...current, search }))}
        onStatusChange={(status) => setFilters((current) => ({ ...current, status }))}
        onSortChange={(sort) => setFilters((current) => ({ ...current, sort }))}
        onAddClick={handleCreateClick}
      />

      {loading ? (
        <Loader text="Loading applications..." />
      ) : applications.length ? (
        <ApplicationsTable
          applications={applications}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      ) : (
        <EmptyState
          title="No applications match this view"
          description="Try a different status filter or add your first application to start building your pipeline."
        />
      )}

      <ApplicationFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        currentApplication={currentApplication}
        submitting={submitting}
      />
    </div>
  );
};

export default ApplicationsPage;
