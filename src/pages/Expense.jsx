import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function Expense() {
  const { expenses, addExpense } = useAppContext();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    addExpense({ id: Date.now(), title, amount: parseFloat(amount) });
    setTitle("");
    setAmount("");
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Expenses</h1>
        <p className="text-gray-500 mt-1">Track your expenses efficiently</p>
      </div>

      {/* Add Expense Form */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Expense</h2>
        <form
          onSubmit={handleAddExpense}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end"
        >
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="Rent, Food, Shopping..."
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="Enter amount"
            />
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
          >
            Add Expense
          </button>
        </form>
      </div>

      {/* Total Expense Card */}
      <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-medium">Total Expenses</h2>
        <p className="text-2xl font-bold mt-1">₹{totalExpenses.toLocaleString()}</p>
      </div>

      {/* Expense Records Table */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Expense Records</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-2 text-gray-600">Title</th>
                <th className="px-4 py-2 text-gray-600">Amount</th>
                <th className="px-4 py-2 text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp.id} className="border-b border-gray-100">
                  <td className="px-4 py-2">{exp.title}</td>
                  <td className="px-4 py-2 text-red-600 font-semibold">₹{exp.amount}</td>
                  <td className="px-4 py-2">{new Date(exp.id).toLocaleDateString()}</td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-400">
                    No expense records yet.
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
