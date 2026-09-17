import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ConfirmDialog from "../components/ConfirmDialog";
import {
  createUserByAdmin,
  isAdmin,
  getAllUsers,
  updateUserRole,
  deleteUserAccount,
} from "../services/authService";

// Ye page sirf Admin ke liye hai. Route App.jsx mein login-check karta hai,
// lekin agar koi User seedha URL type karke /admin-panel khole, to yahan
// bhi ek extra check hai jo unhe access nahi karne deta.
function AdminPanel() {
  const admin = isAdmin();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("GET USERS ERROR:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (admin) {
      loadUsers();
    }
  }, [admin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!userName || !password) {
      setError("Username aur password dono zaroori hain.");
      return;
    }

    setSubmitting(true);

    try {
      const newUser = await createUserByAdmin({ userName, password, role });

      setMessage(`Account "${userName}" bana diya gaya (role: ${role}).`);
      setUserName("");
      setPassword("");
      setRole("USER");

      // List mein bhi turant dikha do
      setUsers((old) => [...old, newUser]);
    } catch (err) {
      console.error("CREATE USER ERROR:", err);

      if (err.response?.status === 403) {
        setError("Sirf Admin naye accounts bana sakta hai.");
      } else if (err.response?.data) {
        const data = err.response.data;
        const msg =
          typeof data === "string"
            ? data
            : Object.values(data || {}).join(", ") || "Request failed";
        setError(msg);
      } else {
        setError("Network Error - Backend check karo");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const updated = await updateUserRole(id, newRole);

      setUsers((old) =>
        old.map((u) => (u.id === id ? updated : u))
      );
    } catch (err) {
      console.error("ROLE UPDATE ERROR:", err);
      alert("Role update failed");
    }
  };

  const confirmDelete = (id) => {
    setDeleteTarget(id);
  };

  const handleDeleteUser = async () => {
    const id = deleteTarget;
    setDeleteTarget(null);

    try {
      await deleteUserAccount(id);

      setUsers((old) => old.filter((u) => u.id !== id));
    } catch (err) {
      console.error("DELETE USER ERROR:", err);

      const data = err.response?.data;
      alert(typeof data === "string" ? data : "Delete failed");
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <p className="text-sm text-slate-500 mb-1">Management</p>

        <h1 className="text-3xl font-bold text-slate-900">
          Admin Panel
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Naye accounts banao, roles manage karo, users delete karo. Ye page sirf Admin ko dikhta hai.
        </p>
      </div>

      {!admin ? (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 max-w-lg">
          <p className="text-sm text-slate-600">
            Access denied - ye page sirf Admin account ke liye hai.
          </p>
        </div>
      ) : (
        <div className="space-y-6">

          {/* Naya account banane ka form */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 max-w-lg">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Naya Account Banao
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Naya username"
                  className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Account Type
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-10 px-3 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              {message && (
                <p className="text-sm text-green-600">{message}</p>
              )}

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full h-10 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 disabled:opacity-60"
              >
                {submitting ? "Creating..." : "Create Account"}
              </button>
            </form>
          </div>

          {/* Sabhi users ki list - role change + delete */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">
                Sabhi Users
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Role change karo ya account delete karo.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      ID
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Username
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Role
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {loadingUsers ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-slate-500">
                        Loading users...
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-slate-500">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm text-slate-600">{u.id}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">{u.userName}</td>
                        <td className="px-6 py-4 text-sm">
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className="text-sm border border-slate-200 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-slate-900"
                          >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => confirmDelete(u.id)}
                            className="text-sm font-semibold text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete user?"
        message="Ye user account permanently delete ho jayega. Wapas nahi aa sakta."
        onConfirm={handleDeleteUser}
        onCancel={() => setDeleteTarget(null)}
      />
    </Layout>
  );
}

export default AdminPanel;