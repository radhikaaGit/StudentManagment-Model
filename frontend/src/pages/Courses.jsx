import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../services/courseService";
import { isAdmin } from "../services/authService";

const emptyForm = {
  courseName: "",
  fees: "",
  trainerName: "",
};

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  // null => add mode, number => editing that course's id
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Sirf Admin hi naya course add/edit kar sakta hai.
  const admin = isAdmin();

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error("GET COURSES ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setErrorMessage("");
  };

  const startAdd = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setErrorMessage("");
    setShowForm(true);
  };

  const startEdit = (course) => {
    setFormData({
      courseName: course.courseName,
      fees: course.fees,
      trainerName: course.trainerName,
    });
    setEditingId(course.id);
    setErrorMessage("");
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setErrorMessage("");

    const payload = {
      ...formData,
      fees: Number(formData.fees),
    };

    try {
      if (editingId) {
        const updated = await updateCourse(editingId, payload);

        setCourses((old) =>
          old.map((c) => (c.id === editingId ? updated : c))
        );
      } else {
        const newCourse = await addCourse(payload);
        setCourses((old) => [...old, newCourse]);
      }

      resetForm();
    } catch (error) {
      console.error("SAVE COURSE ERROR:", error);

      if (error.response) {
        const data = error.response.data;

        if (error.response.status === 403) {
          setErrorMessage(
            "Only an Admin account can add or edit a course."
          );
          return;
        }

        const message =
          typeof data === "string"
            ? data
            : Object.values(data || {}).join(", ") || "Request failed";

        setErrorMessage(`Failed: ${message}`);
      } else {
        setErrorMessage("Network Error - Backend check karo");
      }
    }
  };

  const confirmDelete = (id) => {
    setDeleteTarget(id);
  };

  const handleDelete = async () => {
    const id = deleteTarget;
    setDeleteTarget(null);

    try {
      await deleteCourse(id);

      setCourses((oldCourses) =>
        oldCourses.filter((course) => course.id !== id)
      );
    } catch (error) {
      console.error("DELETE ERROR:", error);

      if (error.response?.status === 403) {
        alert("Only an Admin account can delete courses.");
      } else {
        alert("Delete failed");
      }
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <p className="text-sm text-slate-500 mb-1">
          Management
        </p>

        <h1 className="text-3xl font-bold text-slate-900">
          Courses
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Manage all available courses.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Course List
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              View and manage course information.
            </p>
          </div>

          {admin && (
            <button
              onClick={() => (showForm ? resetForm() : startAdd())}
              className="px-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition"
            >
              {showForm ? "Cancel" : "+ Add Course"}
            </button>
          )}
        </div>

        {!admin && (
          <div className="px-6 py-3 bg-amber-50 border-b border-amber-100 text-sm text-amber-700">
            Only an Admin account can add or edit courses. You're viewing as User.
          </div>
        )}

        {showForm && admin && (
          <div
            className="p-6 bg-slate-50 border-b border-slate-200"
          >
            <div className="grid md:grid-cols-3 gap-4">
              <input
                name="courseName"
                type="text"
                placeholder="Course name"
                value={formData.courseName}
                onChange={handleChange}
                required
                className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
              />

              <input
                name="fees"
                type="number"
                placeholder="Fees"
                value={formData.fees}
                onChange={handleChange}
                required
                className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
              />

              <input
                name="trainerName"
                type="text"
                placeholder="Trainer name"
                value={formData.trainerName}
                onChange={handleChange}
                required
                className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-500 mt-3">{errorMessage}</p>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              className="mt-4 px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800"
            >
              {editingId ? "Update Course" : "Save Course"}
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  ID
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Course Name
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Fees
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Trainer
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    Loading courses...
                  </td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    No courses found.
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {course.id}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                      {course.courseName}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      ₹{course.fees}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {course.trainerName}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        {admin ? (
                          <>
                            <button
                              onClick={() => startEdit(course)}
                              className="text-sm font-semibold text-slate-700 hover:underline"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => confirmDelete(course.id)}
                              className="text-sm font-semibold text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-slate-400">
                            View only
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </div>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete course?"
        message="This will permanently remove this course. This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

    </Layout>
  );
}

export default Courses;