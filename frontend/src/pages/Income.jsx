import React from 'react'
import Sidepanel from '../components/Sidepanel'
import { useState , useEffect} from 'react'
import axios from 'axios'

const Income = () => {
  const [showform, setShowForm] = useState(false);

  //usestates for sending data to backend
  const [name, setname] = useState("");
  const [amount, setamount] = useState("");
  const [category, setcategory] = useState("");
  const [date, setdate] = useState("");
  const [frequency, setfrequency] = useState("");
  const [description, setdescription] = useState("");
  const [type, settype] = useState("income");

  //recent transactions
  const [recentTransactions, setRecentTransactions] = useState([]);

  // Show boxes
  const [totalincome, settotalincome] = useState(0);
  const [monthlyincome, setmonthlyincome] = useState(0);
  const [stocks, setstocks] = useState(0);

  //filling the recent transactions
  const fetchRecentTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/userroutes/transaction_income",
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

  //changes required:

  useEffect(() => {
    // Calculate totals whenever recentTransactions changes
    let total = 0;
    let monthly_income = 0;
    let stocks = 0;
    
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    recentTransactions.forEach(tx => {
      const txDate = new Date(tx.date);
      total += tx.amount;
      
      // Check if transaction is within current month
      if (txDate >= startOfMonth && txDate <= endOfMonth) {
        monthly_income += tx.amount;
      }

      // Add to stocks if source is "Stocks"
      if (tx.category === "Stocks") {
        stocks += tx.amount;
      }
    });
    
    settotalincome(total);
    setmonthlyincome(monthly_income);
    setstocks(stocks);
  }, [recentTransactions]);
  // Call the function to fetch recent transactions when the component mounts
  useEffect(() => {
    fetchRecentTransactions();
  }, []);
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      alert("Amount must be a positive number");
      return;
    }

    settotalincome((prev) => prev + numericAmount);
    // Update monthly income if the transaction date is in current month
    const txDate = new Date(date);
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    if (txDate >= startOfMonth && txDate <= endOfMonth) {
      setmonthlyincome(prev => prev + numericAmount);
    }

    // Update stocks if source is "Stocks"
    if (category === "Stocks") {
      setstocks(prev => prev + numericAmount);
    }
    // Here you would typically send the data to your backend
    const user_transaction = {
      name_transaction: name,
      amount: numericAmount,
      category: category,
      date: date,
      frequency: frequency,
      description: description,
      type: type,
    };
    // Send user_transaction to your backend API
    try {
      const response = await axios.post(
        "http://localhost:3000/userroutes/transactions",
        user_transaction,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you have a token stored in localStorage
          },
        }
      );
      console.log("Transaction added successfully:", response.data);
      setShowForm(false);
      fetchRecentTransactions(); // Refresh recent transactions after adding a new one
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
    // Reset form fields after submission
    setname("");
    setamount("");
    setcategory("");
    setdate("");
    setfrequency("");
    setdescription("");
  };
  return (
    <div className="flex flex-row h-screen w-screen">
      <Sidepanel />

      <div className="flex flex-col overflow-x-hidden  w-screen h-full bg-slate-900">
        <div className="flex flex-row justify-between mb-5  h-15 w-full p-5">
          <h1 className="text-5xl font-medium font-sans text-white ">
            Income
          </h1>
          <button
            onClick={() => {
              setShowForm(!showform);
            }}
            className="text-center h-15 w-70   bg-[#6366F1] text-[#F8FAFC] text-2xl font-bold"
          >
            Create new Income
          </button>
        </div>
        {showform && (
          <div className="flex flex-col items-start justify-start mt-20 p-3 w-[96%]  bg-[#1e2e45] text-white m-5  border rounded-lg ">
            <h1 className="text-2xl font-medium">Add a new Income</h1>
            <form
              onSubmit={handleSubmit}
              className="w-full p-3 flex flex-col items-start justify-between gap-3"
            >
              <div className="box-1 flex flex-row w-full items-start justify-between gap-3">
                <div className="flex flex-col mt-3 items-start justify-start w-1/2 gap-3 ml-3">
                  <label className="text-xl text-[#d1d5db]">Name:</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    className="w-full py-2 px-5 bg-[#576376]"
                    type="text"
                    placeholder="Enter Income name"
                  />
                </div>
                <div
                  required
                  className="flex flex-col mt-3 items-start justify-start w-1/2 gap-3 ml-3"
                >
                  <label className="text-xl text-[#d1d5db]">Amount:</label>
                  <input
                    value={amount}
                    onChange={(e) => {
                      setamount(e.target.value);
                    }}
                    className="w-full py-2 px-5 bg-[#576376]"
                    type="number"
                    placeholder="€ Enter  amount "
                  />
                </div>
              </div>
              <div className="box-2 flex flex-row w-full items-start justify-between gap-3">
                <div className="flex flex-col mt-3 items-start justify-start w-1/2 gap-3 ml-3">
                  <label className="text-xl text-[#d1d5db]">Source:</label>
                  <select
                    required
                    value={category}
                    onChange={(e) => {
                      setcategory(e.target.value);
                    }}
                    className="w-full py-2 px-5 bg-[#576376]"
                  >
                    <option value="">Select a source</option>
                    <option value="Salary">Regular Salary</option>
                    <option value="Business">Business</option>
                    <option value="Investment">Investment</option>
                    <option value="Real-esate">Real-Estate</option>
                    <option value="Stocks">Stocks</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col mt-3 items-start justify-start w-1/2 gap-3 ml-3">
                  <label className="text-xl text-[#d1d5db]">Date:</label>
                  <input
                    required
                    value={date}
                    onChange={(e) => {
                      setdate(e.target.value);
                    }}
                    className="w-full py-2 px-5 bg-[#576376]"
                    type="date"
                  />
                </div>
              </div>
              <div className="box-3 flex flex-row w-full items-start justify-between gap-3">
                <div className="flex flex-col mt-3 items-start justify-start w-1/2 gap-3 ml-3">
                  <label className="text-xl text-[#d1d5db]">Frequency:</label>
                  <select
                    value={frequency}
                    onChange={(e) => {
                      setfrequency(e.target.value);
                    }}
                    className="w-full py-2 px-5 bg-[#576376]"
                  >
                    <option value="one-time">One-time</option>
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
                <div className="flex flex-col mt-3 items-start justify-start w-1/2 gap-3 ml-3">
                  <label className="text-xl text-[#d1d5db]">Description:</label>
                  <input
                    value={description}
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                    className="w-full py-2 px-5 bg-[#576376]"
                    type="text"
                    placeholder="Enter  Description (optional)"
                  />
                </div>
              </div>
              <div className="buttons flex justify-end items-end w-full mt-5 gap-10">
                <button
                  type="button"
                  onClick={() => {
                    {
                      setShowForm(false);
                    }
                    setshowboxes(true);
                  }}
                  className="px-3 text-xl py-2 text-[#d1d5db] border rounded-lg  bg-[#374151]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-12 text-xl font-bold py-2 bg-[#192e4f] border rounded-lg"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="boxesshowingextra flex flex-row gap-10 mt-15  ml-10">
          <div className="box1 w-90 h-30 bg-slate-800 flex flex-col gap-5  p-5">
            <h1 className="text-2xl font-bold text-[#F8FAFC]">
              Total Income
            </h1>
            <p className="Amount text-xl font-medium text-[#94A3B8]">€{totalincome}</p>
          </div>
          <div className="box2 w-90 h-30 bg-slate-800  flex flex-col gap-5  p-5">
            <h1 className="text-2xl font-bold text-[#F8FAFC]">Monthly Income</h1>
            <p className="Amount text-xl font-medium text-[#94A3B8]">€{monthlyincome}</p>
          </div>
          <div className="box3 w-90 h-30 bg-slate-800 flex flex-col gap-5  p-5">
            <h1 className="text-2xl font-bold text-[#F8FAFC]">
              Stocks!
            </h1>
            <p className="Amount text-xl font-medium text-[#94A3B8]">€ {stocks}</p>
          </div>
        </div>

        <div className="recent_transaction flex flex-col gap-5 w-[80%] ml-20  mt-20 border-slate-700">
          <h2 className="text-3xl font-semibold text-sky-400 mb-4">
            Recent Transactions
          </h2>
          {recentTransactions.map((transaction, index) => (
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default Income
