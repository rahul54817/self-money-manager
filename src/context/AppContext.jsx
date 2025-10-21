import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  // ---------------- Income & Expense ----------------
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const addIncome = (item) => setIncome((prev) => [...prev, item]);
  const addExpense = (item) => setExpenses((prev) => [...prev, item]);

  // ---------------- EMI Plans ----------------
  const [emiPlans, setEmiPlans] = useState(() => {
    const saved = localStorage.getItem("emiPlans");
    return saved ? JSON.parse(saved) : [];
  });

  // Add new EMI plan
  const addEmiPlan = ({ title, totalAmount, duration }) => {
    const monthlyAmount = totalAmount / duration;
    const newPlan = {
      id: Date.now(),
      title,
      totalAmount,
      duration,
      transactions: Array.from({ length: duration }, (_, i) => ({
        id: i + 1,
        month: i + 1,
        amount: monthlyAmount,
        status: "Pending",
      })),
      paidEmis: 0,
      pendingEmis: duration,
      progress: 0,
    };
    setEmiPlans((prev) => [...prev, newPlan]);
  };

  // Toggle EMI payment status
  const toggleEMIPayment = (planId, txnId) => {
    setEmiPlans((prevPlans) =>
      prevPlans.map((plan) => {
        if (plan.id !== planId) return plan;

        const updatedTxns = plan.transactions.map((t) =>
          t.id === txnId
            ? { ...t, status: t.status === "Paid" ? "Pending" : "Paid" }
            : t
        );

        const paid = updatedTxns.filter((t) => t.status === "Paid").length;
        const pending = updatedTxns.length - paid;
        const progress = (paid / updatedTxns.length) * 100;

        return {
          ...plan,
          transactions: updatedTxns,
          paidEmis: paid,
          pendingEmis: pending,
          progress,
        };
      })
    );
  };

  const deleteLoan = (id) => {
    setLoans(loans.filter(l => l.id !== id));
  };

  const getSummary = () => {
    const totalLent = loans.filter(l => l.type === "lent").reduce((sum, l) => sum + l.amount, 0);
    const totalBorrowed = loans.filter(l => l.type === "borrowed").reduce((sum, l) => sum + l.amount, 0);
    return { totalLent, totalBorrowed, balance: totalLent - totalBorrowed };
  };

  const [loans, setLoans] = useState([
    // example data
    {
      id: 1,
      name: "Rahul",
      type: "lent", // "borrowed"
      transactions: [
        { id: 1, amount: 2000, status: "Pending", date: "2025-10-01" },
        { id: 2, amount: 3000, status: "Received", date: "2025-10-10" },
      ],
    },
    {
      id: 3,
      name: "Purnesh",
      type: "lent", // "borrowed"
      transactions: [
        { id: 1, amount: 5000, status: "Pending", date: "2025-10-01" },
        { id: 2, amount: 3000, status: "Received", date: "2025-10-10" },
      ],
    },
    {
      id: 2,
      name: "Manish",
      type: "borrowed", // "borrowed"
      transactions: [
        { id: 1, amount: 2000, status: "Pending", date: "2025-10-01" },
        { id: 2, amount: 3000, status: "Received", date: "2025-10-10" },
      ],
    },
    {
      id: 2,
      name: "Manish",
      type: "borrowed", // "borrowed"
      transactions: [
        { id: 1, amount: 2000, status: "Pending", date: "2025-10-01" },
        { id: 2, amount: 3000, status: "Received", date: "2025-10-10" },
      ],
    },
    {
      id: 4,
      name: "Shivam",
      type: "borrowed", // "borrowed"
      transactions: [
        { id: 1, amount: 2000, status: "Pending", date: "2025-10-01" },
        { id: 2, amount: 3000, status: "Received", date: "2025-10-10" },
      ],
    },
    {
      id: 5,
      name: "Pooja",
      type: "borrowed", // "borrowed"
      transactions: [
        { id: 1, amount: 25000, status: "Pending", date: "2025-10-01" },
        { id: 2, amount: 5000, status: "Received", date: "2025-10-10" },
      ],
    },
  ]);

  const addLoan = (loan) => setLoans(prev => [...prev, loan]);

  const toggleLoanPayment = (personId, txnId) => {
    setLoans(prev =>
      prev.map(person => {
        if (person.id !== personId) return person;
        return {
          ...person,
          transactions: person.transactions.map(txn =>
            txn.id === txnId
              ? { ...txn, status: txn.status === "Pending" ? (person.type === "lent" ? "Received" : "Paid") : "Pending" }
              : txn
          ),
        };
      })
    );
  };

  const addPerson = ({ type, name }) => {
    setLoans(prev => [
      ...prev,
      { id: Date.now(), type, name, transactions: [] }
    ]);
  };

  const addLoanTransaction = (personId, transaction) => {
    setLoans(prev =>
      prev.map(p =>
        p.id === personId
          ? { ...p, transactions: [...p.transactions, { id: Date.now(), ...transaction }] }
          : p
      )
    );
  };



  // Persist EMI data in localStorage
  useEffect(() => {
    localStorage.setItem("emiPlans", JSON.stringify(emiPlans));
  }, [emiPlans]);

  // ---------------- Context Value ----------------
  return (
    <AppContext.Provider
      value={{
        income,
        expenses,
        loans,
        addLoan,
        deleteLoan,
        getSummary,
        addIncome,
        addExpense,
        emiPlans,
        addEmiPlan,
        toggleEMIPayment,
        toggleLoanPayment,
        addPerson,
        addLoanTransaction,
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
