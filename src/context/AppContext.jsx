import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState({ name: "Rahul", email: "rahul@example.com" });

  const addIncome = (item) => setIncome([...income, item]);
  const addExpense = (item) => setExpenses([...expenses, item]);
  const updateUser = (data) => setUser(data);

  return (
    <AppContext.Provider value={{ income, expenses,user, addIncome, addExpense, updateUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
