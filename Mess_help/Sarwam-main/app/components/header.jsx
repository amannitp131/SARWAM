"use client";
import React, { useState } from "react";
import Link from "next/link";
import { UserContext } from "../(root)/context/user.context";
import { useContext } from "react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authenticated, setauthenticated] = useContext(UserContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href={"/"}>Sarwam</Link>
      </div>
      <ul className={isOpen ? "navbar-links active" : "navbar-links"}>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          {authenticated.user.username ? (
            <Link href={"/dashboard"}>Dashboard</Link>
          ) : (
            <Link href={"/login"}>Login</Link>
          )}
        </li>
        <li>
          {authenticated.user.username ? (
            <Link href={"/logOut"}>Log Out</Link>
          ) : (
            <Link href={"/signUp"}>Sign Up</Link>
          )}
        </li>
        <li>
          <Link href={"/help"}>Community</Link>
        </li>
      </ul>
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
