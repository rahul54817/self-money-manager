import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function PersonList() {
  const { type } = useParams(); // lent or borrowed
  const { loans } = useAppContext();

  const list = loans.filter(l => l.type === type);

  const pendingAmount = person =>
    person.transactions
      .filter(t => t.status === "Pending")
      .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 capitalize">{type}</h1>
        <p className="text-gray-500 mt-1">
          Click on a person to see transaction details
        </p>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">
          {type === "lent" ? "Lent Money" : "Borrowed Money"}
        </h1>
        <Link
          to={`/loans/${type}/add`}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Add Person
        </Link>
      </div>

      {/* No records message */}
      {list.length === 0 ? (
        <p className="text-gray-400 mt-4 text-center text-lg">
          No records yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(person => (
            <Link
              key={person.id}
              to={`/loans/${type}/${person.id}`}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-5 transform transition hover:scale-105 hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{person.name}</h2>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-gray-700 text-sm">
                    Total: <span className="font-medium">₹{person.transactions.reduce((s, t) => s + t.amount, 0).toLocaleString()}</span>
                  </p>
                  {pendingAmount(person) > 0 && (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">
                      ₹{pendingAmount(person).toLocaleString()} Pending
                    </span>
                  )}
                </div>

                <p className="mt-1 text-gray-600 text-sm">
                  Pending Transactions:{" "}
                  <span className="font-medium">{person.transactions.filter(t => t.status === "Pending").length}</span>
                </p>
              </div>

              <div className="mt-4">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${
                        ((person.transactions.length - person.transactions.filter(t => t.status === "Pending").length) /
                          person.transactions.length) *
                        100
                      }%`
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  Paid {person.transactions.length - person.transactions.filter(t => t.status === "Pending").length} / {person.transactions.length}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
