import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") || false,
  user: null,
  token: null,
  role: localStorage.getItem("role") || null,
};
// console.log(initialState);
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("Actions:", action);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("isAuthenticated", true);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
      console.log("Logout");
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        role: null,
      };
      
    default:
      console.log("Actions:", action);
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const user_role = localStorage.getItem("role");
    if (token) {
      sdk
        .check(token)
        .then((user) => {
          dispatch({
            type: "LOGIN",
            payload: {
              user,
              token,
              role: localStorage.getItem("role"),
            },
          });
        })
        .catch((error) => {
          tokenExpireError(dispatch, error.message);
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
