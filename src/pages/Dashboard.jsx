import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function Dashboard() {
  const { income, expenses } = useAppContext();

  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  const chartData = [
    { name: "Jan", income: 30000, expense: 18000 },
    { name: "Feb", income: 28000, expense: 15000 },
    { name: "Mar", income: 35000, expense: 20000 },
    { name: "Apr", income: 32000, expense: 25000 },
    { name: "May", income: 40000, expense: 23000 },
  ];

  const recentTxns = [
    { id: 1, title: "Salary", amount: 50000, type: "income" },
    { id: 2, title: "Rent", amount: 12000, type: "expense" },
    { id: 3, title: "Food", amount: 3000, type: "expense" },
    { id: 4, title: "Freelance", amount: 8000, type: "income" },
  ];

  return (
    <div className="space-y-8 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Welcome back, Rahul 👋
        </h1>
        <p className="text-gray-500 mt-1">Here’s your financial summary</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {/* Total Income */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-5 sm:p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Total Income</p>
              <h2 className="text-xl sm:text-2xl font-bold mt-1">
                ₹{totalIncome.toLocaleString()}
              </h2>
            </div>
            <ArrowUpRight size={26} />
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-5 sm:p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Total Expenses</p>
              <h2 className="text-xl sm:text-2xl font-bold mt-1">
                ₹{totalExpenses.toLocaleString()}
              </h2>
            </div>
            <ArrowDownRight size={26} />
          </div>
        </div>

        {/* Current Balance */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-5 sm:p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Current Balance</p>
              <h2 className="text-xl sm:text-2xl font-bold mt-1">
                ₹{balance.toLocaleString()}
              </h2>
            </div>
            <Wallet size={26} />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow rounded-2xl p-4 sm:p-6 overflow-x-auto">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
          Income vs Expenses (Monthly)
        </h2>
        <div className="w-full h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#22c55e"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
          Recent Transactions
        </h2>
        <div className="space-y-3">
          {recentTxns.map((txn) => (
            <div
              key={txn.id}
              className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-lg border-l-4 ${txn.type === "income"
                  ? "border-green-500 bg-green-50 hover:shadow-lg"
                  : "border-red-500 bg-red-50 hover:shadow-lg"
                } transition-all duration-300`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-gray-800">{txn.title}</span>
                <span className="text-sm text-gray-500 capitalize">{txn.type}</span>
              </div>
              <span
                className={`flex items-center gap-1 text-lg font-semibold mt-2 sm:mt-0 ${txn.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
              >
                {txn.type === "income" ? <ArrowUpRight /> : <ArrowDownRight />}
                {txn.type === "income" ? "+" : "-"}₹{txn.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
