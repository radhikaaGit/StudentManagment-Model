import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";


function Dashboard() {

  useEffect(()=>{
    api.get("/api/students")
    .then((response) => {
      console.log("Backend Connected");
      console.log("Students: " , response.data);

    })
    .catch((error) => {
      console.log("Backend Connection failed");
      console.log(error)
    });
  }, []);

  return (
    <Layout>
      <div className="mb-8">
        <p className="text-sm text-slate-500 mb-1">
          Overview
        </p>

        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Manage your students and courses from one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Students
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-3">
            120
          </h2>

          <p className="text-xs text-slate-400 mt-2">
            Students registered in system
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Courses
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-3">
            8
          </h2>

          <p className="text-xs text-slate-400 mt-2">
            Courses available
          </p>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-slate-400">
            Student Management
          </p>

          <h2 className="text-xl font-semibold mt-3">
            Manage Students
          </h2>

          <p className="text-xs text-slate-400 mt-2">
            Add, update and view student records.
          </p>

          <Link
            to="/students"
            className="inline-block mt-5 px-4 py-2 bg-white text-slate-900 rounded-lg text-sm font-semibold"
          >
            View Students
          </Link>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-6">

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">

          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">
              Recent Students
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Recently added students
            </p>
          </div>

          <div className="divide-y divide-slate-100">

            <div className="p-5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  Radhika Prajapat
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  radhika@example.com
                </p>
              </div>

              <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-600">
                Active
              </span>
            </div>

            <div className="p-5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  Aarohi
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  aarohi@example.com
                </p>
              </div>

              <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-600">
                Active
              </span>
            </div>

            <div className="p-5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  Saru
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  saru@example.com
                </p>
              </div>

              <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-600">
                Active
              </span>
            </div>

          </div>

          <div className="p-5">
            <Link
              to="/students"
              className="text-sm font-semibold text-slate-900 hover:underline"
            >
              View all students →
            </Link>
          </div>

        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

          <h2 className="text-lg font-bold text-slate-900">
            Quick Actions
          </h2>

          <p className="text-sm text-slate-500 mt-1 mb-6">
            Access commonly used sections
          </p>

          <div className="grid grid-cols-2 gap-4">

            <Link
              to="/students"
              className="border border-slate-200 rounded-xl p-5 hover:bg-slate-50 transition"
            >
              <h3 className="font-semibold text-slate-900">
                Students
              </h3>

              <p className="text-xs text-slate-500 mt-2">
                Manage student records
              </p>
            </Link>

            <Link
              to="/courses"
              className="border border-slate-200 rounded-xl p-5 hover:bg-slate-50 transition"
            >
              <h3 className="font-semibold text-slate-900">
                Courses
              </h3>

              <p className="text-xs text-slate-500 mt-2">
                Manage available courses
              </p>
            </Link>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;