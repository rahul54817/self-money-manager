import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

export default function EMIPlans() {
  const { emiPlans,addEmiPlan  } = useAppContext();
  const [title, setTitle] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleAddPlan = (e) => {
  e.preventDefault();
  if (!title || !totalAmount || !monthlyAmount || !duration || !startDate) return;

  const total = parseFloat(totalAmount);
  const monthly = parseFloat(monthlyAmount);
  const months = parseInt(duration);

  // Create transactions for each month
  const transactions = Array.from({ length: months }, (_, i) => ({
    id: i + 1,
    amount: monthly,
    status: "Pending",
  }));

  addEmiPlan({
    id: Date.now(),
    title,
    totalAmount: total,
    monthlyAmount: monthly,
    duration: months,
    startDate,
    createdAt: new Date(),
    transactions, // ✅ add default transactions
  });

  setTitle("");
  setTotalAmount("");
  setMonthlyAmount("");
  setDuration("");
  setStartDate("");
};


  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">EMI Plans</h1>
        <p className="text-gray-500 mt-1">Create and manage all your EMI plans</p>
      </div>

      {/* Add New EMI Plan */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Create New EMI Plan</h2>
        <form
          onSubmit={handleAddPlan}
          className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end"
        >
          <div>
            <label className="text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              className="mt-1 p-2 border rounded-lg w-full"
              placeholder="Bike Loan"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Total Amount</label>
            <input
              type="number"
              className="mt-1 p-2 border rounded-lg w-full"
              placeholder="100000"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Monthly EMI</label>
            <input
              type="number"
              className="mt-1 p-2 border rounded-lg w-full"
              placeholder="5000"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Duration (months)</label>
            <input
              type="number"
              className="mt-1 p-2 border rounded-lg w-full"
              placeholder="12"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Start Date</label>
            <input
              type="date"
              className="mt-1 p-2 border rounded-lg w-full"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition sm:col-span-5"
          >
            Add Plan
          </button>
        </form>
      </div>

      {/* EMI Plans List */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Your EMI Plans</h2>
        {emiPlans.length === 0 ? (
          <p className="text-gray-400">No EMI Plans yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {emiPlans.map((plan) => {
              const pendingEMIs = plan.transactions?.filter((t) => t.status === "Pending") || [];
              const pendingCount = pendingEMIs.length;
              const pendingAmount = pendingEMIs.reduce((sum, t) => sum + t.amount, 0);

              return (
                <Link
                  key={plan.id}
                  to={`/emi/${plan.id}`}
                  className="p-5 rounded-2xl border border-gray-200 hover:shadow-lg transition bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col justify-between"
                >
                  <div>
  <h3 className="text-lg font-semibold text-gray-800 mb-1">{plan.title || "Untitled Plan"}</h3>
  <p className="text-gray-600 text-sm">
    Total: ₹{(plan.totalAmount ?? 0).toLocaleString()}
  </p>
  <p className="text-gray-600 text-sm">
    Monthly: ₹{(plan.monthlyAmount ?? 0).toLocaleString()}
  </p>
  <p className="text-gray-600 text-sm">
    Duration: {plan.duration ?? 0} months
  </p>
</div>

<div className="mt-4 bg-white/70 rounded-xl p-3 text-sm shadow-inner">
  <p className="text-gray-700 font-medium">
    Pending EMIs:{" "}
    <span className="text-blue-600 font-semibold">
      {pendingCount} / {plan.duration ?? 0}
    </span>
  </p>
  <p className="text-gray-700 font-medium">
    Pending Amount:{" "}
    <span className="text-red-600 font-bold">
      ₹{(pendingAmount ?? 0).toLocaleString()}
    </span>
  </p>
</div>

                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
