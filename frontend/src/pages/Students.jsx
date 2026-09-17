import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";
import { getCourses } from "../services/courseService";
import { isAdmin } from "../services/authService";

const emptyForm = {
  name: "",
  mail: "",
  gender: "",
  courseIds: [],
};

function Students() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  // null => add mode, number => editing that student's id
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  // Delete confirm dialog ke liye kis id ko delete karna hai wo store karta hai
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Sirf Admin hi naye student add/edit kar sakta hai (backend bhi
  // isi rule ko enforce karta hai - ye sirf UI mein button chhupata hai).
  const admin = isAdmin();

  const loadData = async () => {
    try {
      const [studentData, courseData] = await Promise.all([
        getStudents(),
        getCourses(),
      ]);
      setStudents(studentData);
      setCourses(courseData);
    } catch (error) {
      console.error("GET STUDENTS/COURSES ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleCourse = (courseId) => {
    setFormData((old) => {
      const alreadySelected = old.courseIds.includes(courseId);

      return {
        ...old,
        courseIds: alreadySelected
          ? old.courseIds.filter((id) => id !== courseId)
          : [...old.courseIds, courseId],
      };
    });
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const startAdd = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const startEdit = (student) => {
    setFormData({
      name: student.name,
      mail: student.mail,
      gender: student.gender,
      courseIds: (student.courses || []).map((c) => c.id),
    });
    setEditingId(student.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    // e ab optional hai - button pe direct onClick se bhi call ho sakta
    // hai (form ke "submit" event pe depend nahi karna, kuch browser
    // extensions specifically submit event ko intercept/block kar dete hain).
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const payload = {
      name: formData.name,
      mail: formData.mail,
      gender: formData.gender,
      courses: formData.courseIds.map((id) => ({ id })),
    };

    try {
      if (editingId) {
        console.log("SENDING UPDATE for student id:", editingId, "payload:", payload);

        const updated = await updateStudent(editingId, payload);

        console.log("UPDATE SUCCESS - server returned:", updated);

        // Optimistic local update ki jagah ab poori list hi fresh reload
        // kar rahe hain server se - isse guarantee hai ki jo dikh raha hai
        // wahi database mein bhi hai, koi stale/mismatched state nahi rahega.
        await loadData();

        alert("Student updated successfully!");
      } else {
        console.log("SENDING ADD STUDENT, payload:", payload);

        const newStudent = await addStudent(payload);

        console.log("ADD SUCCESS - server returned:", newStudent);

        await loadData();
        alert("Student added successfully!");
      }

      resetForm();
    } catch (error) {
      console.error("SAVE STUDENT ERROR:", error);

      if (error.response) {
        if (error.response.status === 403) {
          alert("Only an Admin account can add or edit students.");
          return;
        }

        const data = error.response.data;
        const message =
          typeof data === "string"
            ? data
            : Object.values(data || {}).join(", ") || "Request failed";

        alert(`Failed: ${error.response.status} - ${message}`);
      } else {
        alert("Network Error - Backend check karo");
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
      await deleteStudent(id);

      setStudents((oldStudents) =>
        oldStudents.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.error("DELETE ERROR:", error);

      if (error.response?.status === 403) {
        alert("Only an Admin account can delete students.");
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
          Students
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Manage all registered students.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="p-6 border-b border-slate-100 flex justify-between items-center">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Student List
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Students from your database.
            </p>
          </div>

          {admin && (
            <button
              onClick={() => (showForm ? resetForm() : startAdd())}
              className="px-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800"
            >
              {showForm ? "Cancel" : "+ Add Student"}
            </button>
          )}

        </div>

        {!admin && (
          <div className="px-6 py-3 bg-amber-50 border-b border-amber-100 text-sm text-amber-700">
            Only an Admin account can add new students. You're viewing as User.
          </div>
        )}

        {showForm && admin && (
          <div
            className="p-6 bg-slate-50 border-b border-slate-200"
          >

            <div className="grid md:grid-cols-3 gap-4">

              <input
                name="name"
                type="text"
                placeholder="Student name"
                value={formData.name}
                onChange={handleChange}
                required
                className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
              />

              <input
                name="mail"
                type="email"
                placeholder="Email"
                value={formData.mail}
                onChange={handleChange}
                required
                className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

            </div>

            {/* Course assign - student ko multiple courses assign kar sakte hain */}
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-700 mb-2">
                Assign Courses
              </p>

              {courses.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No courses available. Add a course first.
                </p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {courses.map((course) => (
                    <label
                      key={course.id}
                      className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.courseIds.includes(course.id)}
                        onChange={() => toggleCourse(course.id)}
                      />
                      {course.courseName}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="mt-4 px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800"
            >
              {editingId ? "Update Student" : "Save Student"}
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
                  Name
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Email
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Gender
                </th>

                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Courses
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
                    colSpan="6"
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    Loading students...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    No students found.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50"
                  >

                    <td className="px-6 py-4 text-sm">
                      {student.id}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold">
                      {student.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {student.mail}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {student.gender}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {(student.courses || []).length > 0
                        ? student.courses.map((c) => c.courseName).join(", ")
                        : "—"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        {admin ? (
                          <>
                            <button
                              onClick={() => startEdit(student)}
                              className="text-sm font-semibold text-slate-700 hover:underline"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => confirmDelete(student.id)}
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
        title="Delete student?"
        message="This will permanently remove this student. This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

    </Layout>
  );
}

export default Students;