import api from "./api";

export const loginUser = async (loginData) => {
  const response = await api.post("/api/login", loginData);

  const { token, role } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("role", role);

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/api/register", userData);

  return response.data;
};

// Sirf Admin call kar sakta hai - naya User/Admin account banata hai.
export const createUserByAdmin = async (userData) => {
  const response = await api.post("/api/admin/create-user", userData);

  return response.data;
};

// Sabhi registered users ki list - sirf Admin ke liye.
export const getAllUsers = async () => {
  const response = await api.get("/api/admin/users");

  return response.data;
};

// Kisi user ka role change karna (USER <-> ADMIN) - sirf Admin.
export const updateUserRole = async (id, role) => {
  const response = await api.put(`/api/admin/users/${id}/role`, { role });

  return response.data;
};

// User account delete karna - sirf Admin.
export const deleteUserAccount = async (id) => {
  const response = await api.delete(`/api/admin/users/${id}`);

  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const isAdmin = () => {
  return getRole() === "ADMIN";
};