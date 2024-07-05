import React from "react";
import logo from "../assets/logo.png"; // Ensure the logo image is correctly imported

function NavBar() {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-dark sticky-top">
      <div className="navbar-collapse justify-content-center">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Logo" width="300" />
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
