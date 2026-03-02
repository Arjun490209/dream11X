import React from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const Login = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-gray-400 via-gray-300 to-gray-400">
      <div className="max-w-lg w-full bg-white rounded-2xl overflow-hidden">
        <h1 className="text-center py-5 font-bold text-white text-xl bg-blue-300 ">Login Admin</h1>
        <div className=" px-5 py-4 w-full space-y-4">
          <div className="flex items-center border border-blue-400 py-0.5 gap-3 px-2 rounded">
            <FaUser className="text-blue-400" size={22}/>
            <input type="text" placeholder="Enter email address" className="border-l border-gray-400 w-full py-2 px-2 focus:outline-none" />
          </div>
          <div className="flex items-center border border-blue-400 py-0.5 gap-3 px-2 rounded">
            <FaLock className="text-blue-400" size={22}/>
            <input type="Password" placeholder="Enter email address" className="border-l border-gray-400 w-full py-2 px-2 focus:outline-none" />
          </div>
       <div className="flex justify-center items-center">
         <button className="bg-blue-400 px-6 py-2 rounded-md">Login</button>
       </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
