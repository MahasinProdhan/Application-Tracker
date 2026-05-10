import api from "./api";

export const getProfileRequest = async () => {
  const { data } = await api.get("/profile");
  return data;
};

export const updateProfileRequest = async (payload) => {
  const { data } = await api.put("/profile", payload);
  return data;
};
