import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const AdminDashboardPage = () => {
  return (
    <div className="px-8 py-02">
      <header className="header sticky top-0 bg-black  flex items-center justify-between ">
        <h1 className="w-3/12">
          <img src={logo} alt="" />
        </h1>

        <div className="w-3/12 flex justify-end">
          <Link to="/">
            <button className="bg-[#9BFF00] rounded-md text-black border-none px-7 py-3">
              Logout
            </button>
          </Link>
        </div>
      </header>
      <div className="today leadboard mt-32">
        <h1 className="heading text w-6/12 text-5xl ">Today’s leaderboard</h1>
        <div className="w-3/12 flex justify-end">

        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
