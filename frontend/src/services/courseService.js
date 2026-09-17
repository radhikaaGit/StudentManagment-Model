import api from "./api";

export const getCourses = async () => {
  const response = await api.get("/api/courses?page=0&size=100");
  return response.data.content;
};

export const addCourse = async (course) => {
  const response = await api.post("/api/courses", {
    courseName: course.courseName,
    fees: course.fees,
    trainerName: course.trainerName,
  });

  return response.data;
};

export const updateCourse = async (id, course) => {
  const response = await api.put(`/api/courses/${id}`, {
    courseName: course.courseName,
    fees: course.fees,
    trainerName: course.trainerName,
  });

  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await api.delete(`/api/courses/${id}`);
  return response.data;
};