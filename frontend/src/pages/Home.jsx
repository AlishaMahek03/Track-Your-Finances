import React from "react";
import "remixicon/fonts/remixicon.css";
import Sidepanel from "../components/Sidepanel";
import {useState, useEffect } from "react";
import axios from "axios";
const Home = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [subscription, setSubscription] = useState(0);


  const fetchTransactionSummary = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/userroutes/transaction_summary",
        {
          headers: {  
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you have a token stored in localStorage
          },
        }
      );
      const { income, expense, subscription } = response.data;
      setIncome(income);
      setExpense(expense);
      setSubscription(subscription);
      console.log("Transaction Summary:", response.data);
    } catch (error) {
      console.error("Error fetching transaction summary:", error);
    }
  };

  const [netIncome, setNetIncome] = useState(0);

  useEffect(() => {
    setNetIncome(income - expense);
  }, [income, expense]);
  const fetchRecentTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/userroutes/transaction_all",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you have a token stored in localStorage
          },
        }
      );
      setRecentTransactions(response.data.transactions || []);
    } catch (error) {
      console.error("Error fetching recent transactions:", error);
    }
  };
  useEffect(() => {
      fetchRecentTransactions();
      fetchTransactionSummary();
    }, []);
  return (
    <div className="flex flex-row h-screen">
      <Sidepanel/>
      <div className="h-screen w-full overflow-x-hidden bg-slate-900 flex flex-col items-start justify-start">
        <div className="boxesshowingextra flex flex-row gap-10 justify-between mt-15  ml-10">
          <div className="box1 w-65 h-35 bg-slate-800 flex flex-col gap-5  p-5">
            <h1 className="text-2xl font-bold text-[#F8FAFC]">
              Net Income
            </h1>
            <p className="Amount text-xl font-medium text-[#cbaf23]">€{netIncome}</p>
          </div>
          <div className="box2 w-65 h-35 bg-slate-800  flex flex-col gap-5  p-5">
            <h1 className="text-2xl font-bold text-[#F8FAFC]">Total Income</h1>
            <p className="Amount text-xl font-medium text-[#0c8d43]">€{income}</p>
          </div>
          <div className="box3 w-65 h-35 bg-slate-800 flex flex-col gap-5  p-5">
            <h1 className="text-2xl font-bold text-[#F8FAFC]">
              Total Expense 
            </h1>
            <p className="Amount text-xl font-medium text-[#f72a01]">€ {expense}</p>
          </div>
          <div className="box4 w-65 h-35 bg-slate-800 flex flex-col gap-5  p-5">
            <h1 className="text-2xl font-bold text-[#F8FAFC]">
              Total Subscriptions 
            </h1>
            <p className="Amount text-xl font-medium text-[#d62fcb]">€ {subscription}</p>
          </div>
        </div>
        <div className="recent_transaction flex flex-col gap-5 w-[80%] ml-20  mt-20 border-slate-700">
          <h2 className="text-3xl font-semibold text-sky-400 mb-4">
            Recent Transactions
          </h2>
          {recentTransactions.map((transaction, index) => (
            
            transaction.type === "income" ? (
            <div
              key={index}
              className="flex justify-between items-center py-3 border-b border-slate-700"
            >
              <div>
                <p className="text-slate-100 font-medium">
                  {transaction.name_transaction}
                </p>
                <p className="text-slate-400 text-sm">
                  {transaction.date
                    ? new Date(transaction.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-bold">
                  + €{transaction.amount.toFixed(2)}
                </p>
                <p className="text-slate-400 text-xs">{transaction.category}</p>
              </div>
            </div>
            ) : ( <div
              key={index}
              className="flex justify-between items-center py-3 border-b border-slate-700"
            >
              <div>
                <p className="text-slate-100 font-medium">
                  {transaction.name_transaction}
                </p>
                <p className="text-slate-400 text-sm">
                  {transaction.date
                    ? new Date(transaction.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="text-rose-400 font-bold">
                  - €{transaction.amount.toFixed(2)}
                </p>
                <p className="text-slate-400 text-xs">{transaction.category}</p>
              </div>
            </div>
            )

          ))}
        </div>
      </div>

      
      
    </div>
  );
};

export default Home;
