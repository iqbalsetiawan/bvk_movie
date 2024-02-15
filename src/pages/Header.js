import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "../assets/Logo.png";
import { useOnlineStatus } from "../context/OnlineStatusContext";

function Header({ onSearch, children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const location = useLocation();

  const isSearchDisabled = location.pathname === "/watched" || !isOnline;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    debounceSearch(event.target.value);
  };

  const debounceSearch = (value) => {
    setTimeout(() => {
      onSearch(value);
    }, 1000);
  };

  return (
    <>
      <header className="header">
        <img
          src={Logo}
          alt="Logo"
          className="logo"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            navigate("/", { replace: true });
          }}
        />
        <div className="right-header">
          <button
            className="header-watched-button"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              navigate("/watched");
            }}
          >
            Watched Movies
          </button>
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={handleSearchChange}
            disabled={isSearchDisabled}
          />
        </div>
      </header>
      <div>{children}</div>
    </>
  );
}

export default Header;
