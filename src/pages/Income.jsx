import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { ArrowUpRight } from "lucide-react";

export default function Income() {
  const { income, addIncome } = useAppContext();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddIncome = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    addIncome({ id: Date.now(), title, amount: parseFloat(amount) });
    setTitle("");
    setAmount("");
  };

  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6 p-2 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Income
        </h1>
        <p className="text-gray-500 mt-1">Manage your income records</p>
      </div>

      {/* Add Income Form */}
      <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 hover:shadow-xl transition">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
          Add New Income
        </h2>
        <form
          onSubmit={handleAddIncome}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end"
        >
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
              placeholder="Salary, Freelance..."
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 p-2 sm:p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
              placeholder="Enter amount"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            Add Income <ArrowUpRight size={18} />
          </button>
        </form>
      </div>

      {/* Total Income */}
      <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-4 sm:p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform flex justify-between items-center">
        <div>
          <h2 className="text-lg sm:text-xl font-medium">Total Income</h2>
          <p className="text-2xl sm:text-3xl font-bold mt-1">
            ₹{totalIncome.toLocaleString()}
          </p>
        </div>
        <ArrowUpRight size={28} />
      </div>

      {/* Income Records Table */}
      <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 overflow-x-auto">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
          Income Records
        </h2>
        <table className="min-w-full text-left divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-gray-600">Title</th>
              <th className="px-4 py-2 text-gray-600">Amount</th>
              <th className="px-4 py-2 text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {income.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-400">
                  No income records yet.
                </td>
              </tr>
            )}
            {income.map((inc) => (
              <tr
                key={inc.id}
                className="hover:bg-green-50 transition-colors rounded-lg"
              >
                <td className="px-4 py-3">{inc.title}</td>
                <td className="px-4 py-3 text-green-600 font-semibold">
                  ₹{inc.amount}
                </td>
                <td className="px-4 py-3">
                  {new Date(inc.id).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
