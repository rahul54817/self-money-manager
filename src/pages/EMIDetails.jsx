import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { ArrowLeft } from "lucide-react";

export default function EMIDetails() {
  const { id } = useParams();
  const { emiPlans, toggleEMIPayment } = useAppContext();

  const plan = emiPlans.find((p) => p.id === parseInt(id));

  if (!plan)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg font-medium">Plan not found ❌</p>
      </div>
    );

  const transactions = plan.transactions || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{plan.title}</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Track your EMI payments —{" "}
            <span className="font-medium text-blue-600">
              {plan.duration} months plan
            </span>
          </p>
        </div>
        <Link
          to="/emi"
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to EMI Plans
        </Link>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">{plan.title}</h2>
            <p className="text-sm opacity-90">
              Total Amount: ₹{parseFloat(plan.totalAmount).toLocaleString()}
            </p>
          </div>
          <div className="flex gap-6 text-sm sm:text-base">
            <div>
              <p className="opacity-80">Paid EMIs</p>
              <p className="font-bold">{plan.paidEmis}</p>
            </div>
            <div>
              <p className="opacity-80">Pending EMIs</p>
              <p className="font-bold">{plan.pendingEmis}</p>
            </div>
            <div>
              <p className="opacity-80">Status</p>
              <p
                className={`font-semibold ${
                  plan.pendingEmis > 0 ? "text-yellow-200" : "text-green-200"
                }`}
              >
                {plan.pendingEmis > 0 ? "Active" : "Completed"}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 h-3 rounded-full mt-4">
          <div
            className="h-3 bg-white rounded-full transition-all duration-500"
            style={{ width: `${plan.progress || 0}%` }}
          ></div>
        </div>
        <div className="text-right text-sm mt-1 opacity-80">
          {plan.progress?.toFixed(0)}% Completed
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white shadow-md rounded-2xl p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          EMI Transactions
        </h2>

        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="px-4 py-3 rounded-tl-lg">Month</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 rounded-tr-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <tr
                key={t.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-gray-700 font-medium">
                  Month {index + 1}
                </td>
                <td className="px-4 py-3 text-blue-600 font-semibold">
                  ₹{t.amount.toLocaleString()}
                </td>
                <td
                  className={`px-4 py-3 font-medium ${
                    t.status === "Paid" ? "text-green-600" : "text-orange-500"
                  }`}
                >
                  {t.status}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleEMIPayment(plan.id, t.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm shadow-sm transition"
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}

            {transactions.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-400 text-sm"
                >
                  No transactions yet. Start paying your EMIs 🚀
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
