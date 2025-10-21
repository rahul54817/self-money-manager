import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export default function AddPersonForm() {
  const { type } = useParams(); // "lent" or "borrowed"
  const { addPerson, addLoanTransaction } = useAppContext();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (!name || !amount) return;

    const personId = Date.now();
    addPerson({ id: personId, type, name, loans: [] }); // loans array for multiple loans

    addLoanTransaction(personId, {
      id: Date.now() + 1,
      amount: parseFloat(amount),
      status: "Pending",
      date: new Date().toISOString(),
    });

    setName("");
    setAmount("");

    navigate(`/loans/${type}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Add {type === "lent" ? "Person you Lent to" : "Person you Borrowed from"}
        </h2>

        <form onSubmit={handleAddPerson} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">Name</label>
            <input
              type="text"
              className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none shadow-sm transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter person's name"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">Amount</label>
            <input
              type="number"
              className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none shadow-sm transition"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-2xl shadow-lg hover:scale-105 transform transition"
          >
            Add Person
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4 text-sm">
          Manage your loans easily and keep track of payments.
        </p>
      </div>
    </div>
  );
}
