import "./Login.css";
import axios from "axios";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../components/loading/loading";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { dispatch } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setShow(true);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://api-social-tzy4.onrender.com/api/auth/login",
        { email: email.current.value, password: password.current.value }
      );
      setShow(false);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      sessionStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      setShow(false);
      setErrMsg(err.response?.data);
    }
  };
  useEffect(() => {
    const ErrorHandler = () => {
      if (errMsg) {
        return { errMsg };
      }
      setErrMsg("");
    };
    ErrorHandler();
  }, [errMsg]);

  return (
    <div className="Login">
      {show ? (
        <Loading />
      ) : (
        <div className="LoginWrapper">
          <div className="LoginLeft">
            <h3 className="LoginLogo">Social Media App</h3>
            <span class="jt --debug">
              <span class="jt__row">
                <span class="jt__text">
                  Connect With Friends and the world around you on Social Media
                  App!
                </span>
              </span>
              <span class="jt__row jt__row--sibling" aria-hidden="true">
                <span class="jt__text">
                  Connect With Friends and the world around you on Social Media
                  App!
                </span>
              </span>
              <span class="jt__row jt__row--sibling" aria-hidden="true">
                <span class="jt__text">
                  Connect With Friends and the world around you on Social Media
                  App!
                </span>
              </span>
              <span class="jt__row jt__row--sibling" aria-hidden="true">
                <span class="jt__text">
                  Connect With Friends and the world around you on Social Media
                  App!
                </span>
              </span>
            </span>
          </div>
          <div className="LoginRight">
            <h4 className="errorText">{errMsg}</h4>
            <form className="LoginBox" onSubmit={handleClick}>
              <input
                placeholder="Email"
                ref={email}
                type="email"
                required
                className="LoginInput"
              />
              <input
                placeholder="Password"
                type="password"
                required
                className="LoginInput"
                minLength="6"
                ref={password}
              />
              <button className="LoginButton">Log In</button>
              <span className="LoginForgot">Forgot Password?</span>
              <Link to="/register">
                <button className="LoginButton">Create New Account</button>
              </Link>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
