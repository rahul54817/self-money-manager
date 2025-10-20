import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function Settings() {
  const { user, updateUser } = useAppContext();
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");

  const handleSave = (e) => {
    e.preventDefault();
    updateUser({ name, email });
    alert("Profile updated successfully!");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your profile and preferences</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white shadow rounded-2xl p-6 max-w-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile Settings</h2>
        <form onSubmit={handleSave} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* App Preferences Section */}
      <div className="bg-white shadow rounded-2xl p-6 max-w-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">App Preferences</h2>
        <p className="text-gray-500 text-sm">More settings like theme, notifications, and backup options will be added soon.</p>
      </div>
    </div>
  );
}
