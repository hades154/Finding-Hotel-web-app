import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  const { toggleSidebar, logoutUser, user } = useAppContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-button" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div className="logo-text-container">
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="button-container">
          <button className="button" onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user.username}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <Link to="/ChangePassword">
              <button
                className="dropdown-button"
                onClick={() => setShowLogout(!showLogout)}
              >
                Change password
              </button>
            </Link>
            {user.role === "admin" && (
              <Link to={`/admin`}>
                <button
                  className="dropdown-button"
                  onClick={() => setShowLogout(!showLogout)}
                >
                  Admin
                </button>
              </Link>
            )}
            <Link to={`/profile/${user._id}`}>
              <button
                className="dropdown-button"
                onClick={() => setShowLogout(!showLogout)}
              >
                profile
              </button>
            </Link>
            <button className="dropdown-button" onClick={logoutUser}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Navbar;
