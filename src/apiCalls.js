import axios from "axios";
import { useContext } from "react";
import {AuthContext} from "./context/AuthContext"


export const LoginCall = async (userInput) => {

  const { dispatch } = useContext(AuthContext);

  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(process.env.REACT_APP_API_URL + "/auth/login", userInput);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    sessionStorage.setItem("user", JSON.stringify(res.data))
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
