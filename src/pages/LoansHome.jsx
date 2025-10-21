import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function LoansHome() {
  const { loans } = useAppContext();

  // Calculate summary
  const lentLoans = loans.filter(l => l.type === "lent");
  const borrowedLoans = loans.filter(l => l.type === "borrowed");

  const totalPending = list =>
    list.reduce((sum, l) => sum + l.transactions.filter(t => t.status === "Pending")
      .reduce((s, t) => s + t.amount, 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Loans & Borrowings</h1>
        <p className="text-gray-500 mt-1">Track your lent and borrowed money</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Lent Card */}
        <Link
          to="/loans/lent"
          className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-2xl p-6 shadow-lg hover:scale-[1.03] transition transform flex justify-between items-center"
        >
          <div>
            <h2 className="text-xl font-semibold">Lent</h2>
            <p className="mt-2">People: {lentLoans.length}</p>
            <p>Total Pending: ₹{totalPending(lentLoans).toLocaleString()}</p>
          </div>
          <ArrowUpRight size={32} />
        </Link>

        {/* Borrowed Card */}
        <Link
          to="/loans/borrowed"
          className="bg-gradient-to-r from-red-400 to-red-600 text-white rounded-2xl p-6 shadow-lg hover:scale-[1.03] transition transform flex justify-between items-center"
        >
          <div>
            <h2 className="text-xl font-semibold">Borrowed</h2>
            <p className="mt-2">People: {borrowedLoans.length}</p>
            <p>Total Pending: ₹{totalPending(borrowedLoans).toLocaleString()}</p>
          </div>
          <ArrowDownRight size={32} />
        </Link>
      </div>
    </div>
  );
}
