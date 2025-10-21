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
        addIncome,
        addExpense,
        emiPlans,
        addEmiPlan,
        toggleEMIPayment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
