import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const [ dispatch] = useReducer();
  const navigate = useNavigate();

  const logout = async () => {
    console.log("Before");
    // localStorage.clear();
    dispatch({
      type: "LOGOUT",
    });
    
    navigate("/admin/login");
  };
  return (
    <div className="px-8 py-02  w-full h-full bg-black">
      <header className="header sticky top-0 m-0 py-10 flex items-center justify-between ">
        <h1 className="w-3/12">
          <img src={logo} alt="" />
        </h1>

        <div className="w-3/12 flex justify-end">
          <Link to="/">
            <button
              className="bg-[#9BFF00] rounded-md text-black border-none px-7 py-3"
              onClick={() => logout()}
            >
              Logout
            </button>
          </Link>
        </div>
      </header>
      <div className="today leadboard mt-32 flex items-center justify-between pb-48">
        <h1 className="heading text w-6/12 text-5xl ">Today’s leaderboard</h1>
        <div className="w-6/12 flex justify-end">
          <div className="w-[35rem] bg-[#1D1D1D] px-20 py-5 rounded-md flex items-center justify-between">
            <h3 className="w-4/12 text-sm ">30 May 2022</h3>
            <h3 className="w-6/12 text-sm text-center bg-[#9BFF00] rounded-md text-black border-none px-3 py-2">
              Submissions OPEN
            </h3>
            <h3 className="w-4/12 text-sm text-center">11:34</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
