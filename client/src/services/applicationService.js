import api from "./api";

export const getApplicationsRequest = async (params) => {
  const { data } = await api.get("/applications", { params });
  return data;
};

export const createApplicationRequest = async (payload) => {
  const { data } = await api.post("/applications", payload);
  return data;
};

export const updateApplicationRequest = async (id, payload) => {
  const { data } = await api.put(`/applications/${id}`, payload);
  return data;
};

export const deleteApplicationRequest = async (id) => {
  const { data } = await api.delete(`/applications/${id}`);
  return data;
};
