import Home from "./pages/Home/Home";
import React, { Fragment, useContext } from "react";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/search";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Router>
        <Fragment>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Register />}></Route>
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            ></Route>
            <Route
              path="/register"
              element={user ? <Navigate to="/" /> : <Register />}
            ></Route>
            <Route
              path="/profile/:username"
              element={!user ? <Navigate to="/login" /> : <Profile />}
            ></Route>
            <Route
              path="/search/:username"
              element={!user ? <Navigate to="/login" /> : <Search />}
            ></Route>
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
