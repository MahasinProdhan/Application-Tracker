import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Modal from "../common/Modal";
import Select from "../common/Select";
import { APPLICATION_STATUSES } from "../../utils/constants";
import { toDateInputValue } from "../../utils/date";

const initialState = {
  companyName: "",
  role: "",
  location: "",
  salary: "",
  platform: "",
  appliedDate: "",
  status: "Applied",
  interviewDate: "",
  notes: "",
  jobLink: "",
  resumeVersion: "",
};

const ApplicationFormModal = ({ isOpen, onClose, onSubmit, currentApplication, submitting }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (currentApplication) {
      setFormData({
        ...currentApplication,
        appliedDate: toDateInputValue(currentApplication.appliedDate),
        interviewDate: toDateInputValue(currentApplication.interviewDate),
      });
      return;
    }

    setFormData(initialState);
  }, [currentApplication, isOpen]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(formData);
  };

  return (
    <Modal
      title={currentApplication ? "Edit application" : "Add application"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <Input label="Company name" name="companyName" value={formData.companyName} onChange={handleChange} required />
        <Input label="Role applied" name="role" value={formData.role} onChange={handleChange} required />
        <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
        <Input label="Salary / CTC" name="salary" value={formData.salary} onChange={handleChange} />
        <Input label="Platform" name="platform" value={formData.platform} onChange={handleChange} />
        <Input label="Applied date" type="date" name="appliedDate" value={formData.appliedDate} onChange={handleChange} required />
        <Select label="Current status" name="status" value={formData.status} onChange={handleChange}>
          {APPLICATION_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>
        <Input label="Interview date" type="date" name="interviewDate" value={formData.interviewDate} onChange={handleChange} />
        <Input label="Job link" name="jobLink" value={formData.jobLink} onChange={handleChange} placeholder="https://..." />
        <Input label="Resume version" name="resumeVersion" value={formData.resumeVersion} onChange={handleChange} />
        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-gray-700">Notes</span>
          <textarea
            className="input min-h-32"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add recruiter notes, interview prep points, or follow-up reminders"
          />
        </label>
        <div className="md:col-span-2 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : currentApplication ? "Update application" : "Create application"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ApplicationFormModal;
