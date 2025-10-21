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

    // Create the person
    const personId = Date.now();
    addPerson({ id: personId, type, name, transactions: [] });

    // Add the first transaction
    addLoanTransaction(personId, {
      id: Date.now() + 1,
      amount: parseFloat(amount),
      status: "Pending", // default status
      date: new Date().toISOString(),
    });

    // Reset form
    setName("");
    setAmount("");

    navigate(`/loans/${type}`); // go to person list
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Add {type === "lent" ? "Person you Lent to" : "Person you Borrowed from"}
      </h2>
      <form onSubmit={handleAddPerson} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter person's name"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">Amount</label>
          <input
            type="number"
            className="mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Add Person
        </button>
      </form>
    </div>
  );
}
