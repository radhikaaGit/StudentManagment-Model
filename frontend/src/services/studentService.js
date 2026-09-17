import api from "./api";

export const getStudents = async () => {
  const response = await api.get("/api/students?page=0&size=100");
  return response.data.content;
};

export const addStudent = async (student) => {
  const response = await api.post("/api/students", {
    name: student.name,
    mail: student.mail,
    gender: student.gender,
    courses: student.courses, // [{ id: 1 }, { id: 2 }] - PEHLE YE MISSING THA!
  });

  return response.data;
};

export const updateStudent = async (id, student) => {
  const response = await api.put(`/api/students/${id}`, {
    name: student.name,
    mail: student.mail,
    gender: student.gender,
    courses: student.courses, // [{ id: 1 }, { id: 2 }] - PEHLE YE MISSING THA!
  });

  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await api.delete(`/api/students/${id}`);
  return response.data;
};