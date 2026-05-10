import api from "./api";

export const getCalendarEventsRequest = async () => {
  const { data } = await api.get("/calendar-events");
  return data;
};

export const createCalendarEventRequest = async (payload) => {
  const { data } = await api.post("/calendar-events", payload);
  return data;
};

export const updateCalendarEventRequest = async (id, payload) => {
  const { data } = await api.put(`/calendar-events/${id}`, payload);
  return data;
};

export const deleteCalendarEventRequest = async (id) => {
  const { data } = await api.delete(`/calendar-events/${id}`);
  return data;
};
