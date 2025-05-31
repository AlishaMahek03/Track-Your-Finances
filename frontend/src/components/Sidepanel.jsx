import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidepanel = () => {
  const navigate = useNavigate();
  const handleExpenseClick = () => {
    navigate('/expense');
  };
  const handleIncomeclick = () => {
    navigate('/income');
  }
  const handleSavingsClick = () => {
    navigate('/savings');
  }
  const handleSubscriptionsClick = () => {
    navigate('/subscriptions');
  }
  const handleDashboardClick = () => {
    navigate('/home');
  }
  return (
    <div className="w-[21%] panel-home h-screen bg-black text-white flex flex-col items-start justify-start p-5">
        <div className="profile">
          <h2 className="text-2xl flex gap-2  items-center"><i className="ri-user-3-line text-5xl"></i>Hey User!</h2>
          <p className="p-2 text-2xl mt-5">Howz Everything?</p>
        </div>
        <div className="home-panel flex flex-col items-start justify-start mt-15  h-[70%] ">
          <nav className="flex flex-col gap-5 justify-center items-center">
            <ul className="flex flex-col justify-start items-start gap-8">
              <li onClick={handleDashboardClick} className="text-2xl flex justify-start items-center gap-4 hover:border hover:bg-gray-700 p-2 rounded-md  hover:w-55 ">
                <i className="ri-dashboard-line text-2xl"></i>Dashboard
              </li>
              <li onClick={handleExpenseClick} className="text-2xl flex justify-start items-center gap-4 hover:border hover:bg-gray-700 p-2 rounded-md hover:w-55">
                <i className="ri-money-dollar-box-line text-2xl"></i>Expense
              </li>
              <li onClick={handleIncomeclick} className="text-2xl flex justify-start items-center gap-4 hover:border hover:bg-gray-700 p-2 rounded-md hover:w-55">
                <i className="ri-bank-fill text-2xl"></i>Income
              </li>
              <li onClick={handleSavingsClick} className="text-2xl flex justify-start items-center gap-4 hover:border hover:bg-gray-700 p-2 rounded-md hover:w-55">
                <i className="ri-visa-fill text-2xl"></i>Savings
              </li>
              <li onClick={handleSubscriptionsClick} className="text-2xl flex justify-start items-center gap-4 hover:border hover:bg-gray-700 p-2 rounded-md hover:w-55">
                <i className="ri-archive-fill text-2xl"></i>Subscriptions
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center justify-center ml-2 ">
          <h2 className="text-2xl flex items-center gap-2 cursor-pointer hover:text-gray-300">
           <i className="ri-logout-box-fill"></i>
           LogOut
          </h2>
         
        </div>
      </div>
  )
}

export default Sidepanel
