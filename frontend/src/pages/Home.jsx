import React from "react";
import "remixicon/fonts/remixicon.css";
import Sidepanel from "../components/Sidepanel";
const Home = () => {
  return (
    <div className="flex flex-row h-screen">
      <Sidepanel/>
      <div className="w-[60%] h-screen bg-[#363636] flex items-center justify-center">
        <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
      </div>
      <div className="w-[20%] h-screen bg-black text-white flex flex-col items-center justify-center"></div>
    </div>
  );
};

export default Home;
