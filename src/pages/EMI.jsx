import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function EMI() {
  const { emis, addEMI, updateEMIStatus } = useAppContext();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAddEMI = (e) => {
    e.preventDefault();
    if (!title || !amount || !dueDate) return;
    addEMI({
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      dueDate,
      status: "Pending",
    });
    setTitle("");
    setAmount("");
    setDueDate("");
  };

  const totalPending = emis
    .filter((e) => e.status === "Pending")
    .reduce((sum, e) => sum + e.amount, 0);

  const totalPaid = emis
    .filter((e) => e.status === "Paid")
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">EMI Tracker</h1>
        <p className="text-gray-500 mt-1">Track your pending and paid EMIs</p>
      </div>

      {/* Add EMI Form */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New EMI</h2>
        <form
          onSubmit={handleAddEMI}
          className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end"
        >
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Car Loan, iPhone EMI..."
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter amount"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Add EMI
          </button>
        </form>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-medium">Total Pending</h2>
          <p className="text-2xl font-bold mt-1">₹{totalPending.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-medium">Total Paid</h2>
          <p className="text-2xl font-bold mt-1">₹{totalPaid.toLocaleString()}</p>
        </div>
      </div>

      {/* EMI Records Table */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">EMI Records</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-2 text-gray-600">Title</th>
                <th className="px-4 py-2 text-gray-600">Amount</th>
                <th className="px-4 py-2 text-gray-600">Due Date</th>
                <th className="px-4 py-2 text-gray-600">Status</th>
                <th className="px-4 py-2 text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {emis.map((emi) => (
                <tr key={emi.id} className="border-b border-gray-100">
                  <td className="px-4 py-2">{emi.title}</td>
                  <td className="px-4 py-2 text-blue-600 font-semibold">₹{emi.amount}</td>
                  <td className="px-4 py-2">{emi.dueDate}</td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      emi.status === "Paid" ? "text-green-600" : "text-orange-500"
                    }`}
                  >
                    {emi.status}
                  </td>
                  <td className="px-4 py-2">
                    {emi.status === "Pending" ? (
                      <button
                        onClick={() => updateEMIStatus(emi.id, "Paid")}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600"
                      >
                        Mark Paid
                      </button>
                    ) : (
                      <button
                        onClick={() => updateEMIStatus(emi.id, "Pending")}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600"
                      >
                        Mark Pending
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {emis.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400">
                    No EMI records yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
