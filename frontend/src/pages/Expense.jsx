import React, { useState } from 'react'
import Sidepanel from '../components/Sidepanel'
import axios from 'axios';


const Expense = () => {
  const [showform, setShowForm] = useState(false);
  const [showboxes, setshowboxes] = useState(true);

  //usestates for sending data to backend
  const [name, setname] = useState("");
  const [amount, setamount] = useState("");
  const [category, setcategory] = useState("");
  const [date, setdate] = useState("");
  const [frequency, setfrequency] = useState("");
  const [description, setdescription] = useState("");
  const [type, settype] = useState("expense");


  // Function to handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();

    const numericAmount = Number(amount);
  if (!numericAmount || numericAmount <= 0) {
    alert("Amount must be a positive number");
    return;
  }
    // Here you would typically send the data to your backend
    const user_transaction = {
      name_transaction: name,
      amount: numericAmount,
      category: category,
      date: date,
      frequency: frequency,
      description: description,
      type: type
    };
    // Send user_transaction to your backend API
    try {
      const response = await axios.post('http://localhost:3000/userroutes/transactions', user_transaction);
      console.log('Transaction added successfully:', response.data);
    } catch (error) {
      console.error('Error adding transaction:', error);
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
    <div className="flex flex-row h-screen">
    <Sidepanel />
    <div className='flex flex-col h-screen overflow-scroll bg-[#16151a]'>
        
        <div className="chart flex flex-col h-[70%] justify-between items-start relative">
          <h1 className='font-bold text-3xl text-white'>Expenses</h1>
          {showform&&<div className='flex flex-col items-start justify-start mt-5 p-3 w-[96%]  bg-[#1e2e45] text-white m-5  border rounded-lg '>
              <h1 className='text-2xl font-medium'>Add a new expense</h1>
              <form onSubmit={handleSubmit} className='w-full p-3 flex flex-col items-start justify-between gap-3'>
                <div className='box-1 flex flex-row w-full items-start justify-between gap-3'>
                <div className='flex flex-col mt-3 items-start justify-start w-1/2 gap-3 ml-3'>
                <label  className='text-xl text-[#d1d5db]'>Name:</label>
                <input required value={name} onChange={(e)=>{setname(e.target.value)}} className='w-full py-2 px-5 bg-[#576376]' type="text" placeholder='Enter expense name' />
                </div>
                <div required className='flex flex-col mt-3 items-start justify-start w-1/2 gap-3 ml-3'>
                <label  className='text-xl text-[#d1d5db]'>Amount:</label>
                <input value={amount} onChange={(e)=>{setamount(e.target.value)}} className='w-full py-2 px-5 bg-[#576376]' type="number" placeholder='€ Enter  amount ' />
                </div>
                </div>
                <div className='box-2 flex flex-row w-full items-start justify-between gap-3'>
                <div className='flex flex-col mt-3 items-start justify-start w-1/2 gap-3 ml-3'>
                <label  className='text-xl text-[#d1d5db]'>Category:</label>
                <select required value={category} onChange={(e)=>{setcategory(e.target.value)}} className='w-full py-2 px-5 bg-[#576376]'>
                  <option value="">Select a category</option>
                  <option value="Housing">Housing</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Food">Food</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Health Care">Health Care</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Personal">Personal</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Education">Education</option>
                </select>
                </div>
                <div className='flex flex-col mt-3 items-start justify-start w-1/2 gap-3 ml-3'>
                <label  className='text-xl text-[#d1d5db]'>Date:</label>
                <input required value={date} onChange={(e)=>{setdate(e.target.value)}} className='w-full py-2 px-5 bg-[#576376]' type="date" />
                </div>
                </div>
                <div className='box-3 flex flex-row w-full items-start justify-between gap-3'>
                <div className='flex flex-col mt-3 items-start justify-start w-1/2 gap-3 ml-3'>
                <label  className='text-xl text-[#d1d5db]'>Frequency:</label>
                <select value={frequency} onChange={(e)=>{setfrequency(e.target.value)}} className='w-full py-2 px-5 bg-[#576376]'>
                  <option value="one-time">One-time</option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
                </div>
                <div className='flex flex-col mt-3 items-start justify-start w-1/2 gap-3 ml-3'>
                <label  className='text-xl text-[#d1d5db]'>Description:</label>
                <input value={description} onChange={(e)=>{setdescription(e.target.value)}} className='w-full py-2 px-5 bg-[#576376]' type="text" placeholder='Enter  Description (optional)' />
                </div>
                </div>
                <div className="buttons flex justify-end items-end w-full mt-5 gap-10">
                  <button type='button' onClick={()=>{{setShowForm(false)} setshowboxes(true)}} className='px-3 text-xl py-2 text-[#d1d5db] border rounded-lg  bg-[#374151]'>Cancel</button>
                  <button type='submit' className='px-12 text-xl font-bold py-2 bg-[#192e4f] border rounded-lg'>Add</button>
                </div>
              </form>
            </div>}
            
            <div className='flex justify-between items-start w-full h-screen  text-white '>
            <img src="https://datavizproject.com/wp-content/uploads/types/Bar-Chart-Vertical.png" className='w-[40%] mt-5 ml-5' alt="" />
            
            <button onClick={()=>{{setShowForm(true)} setshowboxes(false)}} className='bg-blue-600 px-3 mt-0 mr-15 m-2 py-3   text-white text-2xl font-medium'>Create a new Expense</button>

            {showboxes&&<div  className='border w-[40%] h-[22%] bg-[#1e2e45] m-5 p-3 rounded-lg absolute top-30 right-0'>
              <div className='flex justify-between w-full'>
              <h2 className='text-2xl text-[#d1d5db] font-medium'>Regular Expenses</h2>
              <i className="ri-wallet-3-line text-red-500 text-3xl"></i>
              </div>

              <div className='w-full flex flex-col justify-between  mt-5'>
                <h2>$0.00</h2>
                <p>0 Transactions!</p>
              </div>
            </div>}
            {showboxes&&<div className='border w-[40%] h-[22%] bg-[#1e2e45] m-5 p-3 rounded-lg absolute top-70 right-0'>
              <div className='flex justify-between w-full'>
              <h2 className='text-2xl text-[#d1d5db] font-medium'>Monthly Loans</h2>
              <i className="ri-wallet-3-line text-red-500 text-3xl"></i>
              </div>

              <div className='w-full flex flex-col justify-between  mt-5'>
                <h2>$0.00</h2>
                <p>0 Transactions!</p>
              </div>
            </div>}
            </div>
        </div>
        <div className='flex h-[30%] overflow-scroll bg-[#1e2e45] mt-5'>
          <h3 className='text-2xl text-white p-4'>Recent Transactions!</h3>
        </div>
    </div>
    
    </div>
  )
}

export default Expense
