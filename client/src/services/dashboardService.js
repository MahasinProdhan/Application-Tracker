import api from "./api";

export const getDashboardRequest = async () => {
  const { data } = await api.get("/dashboard");
  return data;
};
