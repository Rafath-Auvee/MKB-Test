import React from "react";
import { AuthContext } from "./authContext";
import { Routes, Route, Navigate } from "react-router-dom";
import SnackBar from "./components/SnackBar";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function renderRoutes(role) {
  switch (role) {
    case "admin":
      return (
        <Routes>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboardPage />}
          ></Route>
        </Routes>
      );
      break;
    default:
      return (
        <Routes>
          <Route exact path="/admin/login" element={<AdminLoginPage />}></Route>
          <Route path="*" exact element={<NotFoundPage />}></Route>
        </Routes>
      );
      break;
  }
}

function Main() {
  const { state } = React.useContext(AuthContext);
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  React.useEffect(() => {
    if (state.isAuthenticated) {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    }
  }, [state.isAuthenticated]);

  return (
    <div className="h-full w-full h-full bg-transparent text-white font-sans">
      <div className="flex w-full">
        <div className="w-full">
          <div className="">
            {!state.isAuthenticated
              ? renderRoutes("none")
              : renderRoutes(state.role)}
          </div>
        </div>
      </div>
      {/* {showSnackbar && (
        <div
          id="mkd-toast"
          className="absolute top-5 right-5 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400"
          role="alert"
        >
          <div className="text-sm font-normal">Logged in successfully!</div>
        </div>
      )} */}
    </div>
  );
}

export default Main;
