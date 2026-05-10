import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Modal from "../common/Modal";
import Select from "../common/Select";

const initialState = {
  type: "interview",
  company: "",
  title: "",
  date: "",
  time: "",
  notes: "",
};

const eventOptions = [
  { label: "Interview", value: "interview" },
  { label: "Assessment", value: "assessment" },
  { label: "Follow-up", value: "follow-up" },
  { label: "Deadline", value: "deadline" },
];

const ScheduleEventModal = ({ isOpen, onClose, onSubmit, submitting }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialState);
    }
  }, [isOpen]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(formData);
  };

  return (
    <Modal title="Schedule Event" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select label="Event Type" name="type" value={formData.type} onChange={handleChange}>
          {eventOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Input
          label="Company Name"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <Input
          label="Event Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <Input
            label="Time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-gray-700">Notes</span>
          <textarea
            className="input min-h-24"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Optional context for the event"
          />
        </label>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Scheduling..." : "Schedule Event"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ScheduleEventModal;
