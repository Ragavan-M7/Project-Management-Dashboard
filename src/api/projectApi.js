import axiosInstance from "./axiosInstance";

//............project API (CRUD)
export const getProjects = () => {
  return axiosInstance.get("/projects");
};

export const getProjectById = (id) => {
  return axiosInstance.get(`/projects/${id}`);
};


export const addProject = (data) => {
  return axiosInstance.post("/projects", data);
};


export const updateProject = (id, data) => {
  return axiosInstance.put(`/projects/${id}`, data);
};


export const deleteProject = (id) => {
  return axiosInstance.delete(`/projects/${id}`);
};