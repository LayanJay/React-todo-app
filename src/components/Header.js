import React from "react";
import "./Header.css";
import logo from "../assets/todo-logo.svg";

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo" />
      <div className="name">Todos</div>
    </div>
  );
}

export default Header;
