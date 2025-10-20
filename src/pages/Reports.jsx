import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Reports() {
  const { income, expenses } = useAppContext();
  const [filterMonth, setFilterMonth] = useState("");

  // Sample monthly aggregated data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const chartData = months.map((month, idx) => ({
    name: month,
    income: income[idx]?.amount || 0,
    expense: expenses[idx]?.amount || 0,
  }));

  // Filtered chart data (if a month is selected)
  const filteredData = filterMonth
    ? chartData.filter((d) => d.name === filterMonth)
    : chartData;

  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
        <p className="text-gray-500 mt-1">Visualize your financial data</p>
      </div>

      {/* Filter Month */}
      <div className="flex items-center gap-4">
        <label className="font-medium text-gray-700">Filter by Month:</label>
        <select
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          <option value="">All</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-2xl shadow">
          <p className="text-sm opacity-80">Total Income</p>
          <h2 className="text-2xl font-bold mt-1">₹{totalIncome.toLocaleString()}</h2>
        </div>
        <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 rounded-2xl shadow">
          <p className="text-sm opacity-80">Total Expenses</p>
          <h2 className="text-2xl font-bold mt-1">₹{totalExpenses.toLocaleString()}</h2>
        </div>
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-2xl shadow">
          <p className="text-sm opacity-80">Balance</p>
          <h2 className="text-2xl font-bold mt-1">₹{balance.toLocaleString()}</h2>
        </div>
      </div>

      {/* Income vs Expenses Bar Chart */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Income vs Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Trend Line Chart */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={3} />
            <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
