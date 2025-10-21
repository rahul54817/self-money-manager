import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function PersonDetails() {
  const { type, personId } = useParams();
  const { loans, toggleLoanPayment } = useAppContext();

  const person = loans.find(p => p.id === parseInt(personId));
  if (!person) return <p className="text-center text-gray-400 mt-6">Person not found</p>;

  const totalPending = person.transactions
    .filter(t => t.status === "Pending")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalAmount = person.transactions.reduce((sum, t) => sum + t.amount, 0);

  const paidCount = person.transactions.filter(t => t.status === "Paid").length;
  const totalCount = person.transactions.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">{person.name}</h1>
        <p className="text-gray-600 mt-1">
          Total: <span className="font-semibold">₹{totalAmount.toLocaleString()}</span> | Pending:{" "}
          <span className="font-semibold text-red-600">₹{totalPending.toLocaleString()}</span>
        </p>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${(paidCount / totalCount) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">
            Paid {paidCount} / {totalCount}
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {person.transactions.map(txn => (
              <tr
                key={txn.id}
                className="hover:bg-gray-50 transition cursor-pointer rounded-lg"
              >
                <td className="px-4 py-3 font-medium text-gray-800">₹{txn.amount.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      txn.status === "Pending" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
                    }`}
                  >
                    {txn.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{txn.date || "-"}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleLoanPayment(person.id, txn.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition"
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {person.transactions.length === 0 && (
          <p className="text-gray-400 mt-4 text-center">No transactions yet.</p>
        )}
      </div>
    </div>
  );
}
