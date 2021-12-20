import "./Register.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  async function handleClick(e) {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(process.env.REACT_APP_API_URL + "/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="Login">
      <div className="LoginWrapper">
        <div className="LoginLeft">
          <h3 className="LoginLogo">Social Media App</h3>
          <span class="jt --debug">
            <span class="jt__row">
              <span class="jt__text">Connect With Friends and the world around you on Social Media App!</span>
            </span>
            <span class="jt__row jt__row--sibling" aria-hidden="true">
              <span class="jt__text">Connect With Friends and the world around you on Social Media App!</span>
            </span>
            <span class="jt__row jt__row--sibling" aria-hidden="true">
              <span class="jt__text">Connect With Friends and the world around you on Social Media App!</span>
            </span>
            <span class="jt__row jt__row--sibling" aria-hidden="true">
              <span class="jt__text">Connect With Friends and the world around you on Social Media App!</span>
            </span>
          </span>
        </div>
        <div className="LoginRight">
          <form className="LoginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              ref={username}
              required
              type="text"
              className="LoginInput"
            />
            <input
              placeholder="Email"
              ref={email}
              required
              type="email"
              className="LoginInput"
            />
            <input
              placeholder="Password"
              type="password"
              required
              className="LoginInput"
              ref={password}
            />
            <input
              placeholder="Password Again"
              ref={passwordAgain}
              required
              type="password"
              className="LoginInput"
            />
            <button className="LoginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login">
              <button className="LoginButton">Log Into Your Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
