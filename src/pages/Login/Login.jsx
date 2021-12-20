import "./Login.css";
import axios from "axios";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/auth/login",
        { email: email.current.value, password: password.current.value }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      sessionStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  }

  return (
    <div className="Login">
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
    </div>
  );
}
