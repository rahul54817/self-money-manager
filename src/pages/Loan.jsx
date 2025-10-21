import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function Loans() {
  const { loans, addLoan, deleteLoan, getSummary } = useAppContext();
  const [name, setName] = useState("");
  const [type, setType] = useState("lent");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !amount || !date) return;

    addLoan({ id: Date.now(), name, type, amount: parseFloat(amount), note, date });

    setName(""); setAmount(""); setNote(""); setDate(""); setType("lent");
  };

  const summary = getSummary();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Loans & Borrowings</h1>
        <p className="text-gray-500 mt-1">Track money you gave or took</p>
      </div>

      {/* Add Loan Form */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Record</h2>
        <form className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end" onSubmit={handleAdd}>
          <input type="text" placeholder="Person Name" value={name} onChange={e=>setName(e.target.value)} className="p-2 border rounded-lg w-full"/>
          <select value={type} onChange={e=>setType(e.target.value)} className="p-2 border rounded-lg w-full">
            <option value="lent">Lent (Udhar Diya)</option>
            <option value="borrowed">Borrowed (Udhar Liya)</option>
          </select>
          <input type="number" placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} className="p-2 border rounded-lg w-full"/>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="p-2 border rounded-lg w-full"/>
          <input type="text" placeholder="Note (optional)" value={note} onChange={e=>setNote(e.target.value)} className="p-2 border rounded-lg w-full"/>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition sm:col-span-5">Add</button>
        </form>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-green-400 text-white p-6 rounded-2xl shadow">
          <p>Total Lent</p>
          <h2 className="text-2xl font-bold">₹{summary.totalLent.toLocaleString()}</h2>
        </div>
        <div className="bg-red-400 text-white p-6 rounded-2xl shadow">
          <p>Total Borrowed</p>
          <h2 className="text-2xl font-bold">₹{summary.totalBorrowed.toLocaleString()}</h2>
        </div>
        <div className="bg-blue-400 text-white p-6 rounded-2xl shadow">
          <p>Balance</p>
          <h2 className="text-2xl font-bold">₹{summary.balance.toLocaleString()}</h2>
        </div>
      </div>

      {/* Loans Table */}
      <div className="bg-white shadow rounded-2xl p-6 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Note</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(l => (
              <tr key={l.id} className="border-b">
                <td className="px-4 py-2">{l.name}</td>
                <td className={`px-4 py-2 ${l.type==="lent"?"text-green-600":"text-red-600"}`}>{l.type==="lent"?"Lent":"Borrowed"}</td>
                <td className="px-4 py-2 font-semibold">₹{l.amount.toLocaleString()}</td>
                <td className="px-4 py-2">{new Date(l.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{l.note}</td>
                <td className="px-4 py-2">
                  <button className="bg-red-500 text-white px-2 py-1 rounded-lg" onClick={()=>deleteLoan(l.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
