'use client'
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import Navbar from "../../../components/navbar";
import { UserContext } from "../../context/user.context";
import { useContext } from "react";
import Link from "next/link";
import { ToastContainer, toast } from 'react-hot-toast';

const Requestleave = () => {
    const [authenticated]=useContext(UserContext);
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    subject: "",
    document: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      document: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // toast.success("Once it will Fully Functional and you are Verified,You will be able to send your application through this platform");
    toast.success("Application yet to be Verified")
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="app">
      <Navbar />
      {/* <ToastContainer /> */}
        <header className="app-header">
          <div className="app-header-logo">
            <h1 className="logo-title">
              <span>{authenticated?.user?.college}</span>
            </h1>
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            <FaBars />
          </button>
          <div className="app-header-actions">
            <button className="user-profile">
              <span>{authenticated?.user?.username}</span>
              <img
                src="https://avatars.githubusercontent.com/u/164627482?s=400&u=a1e3b2c06bb5f3c76a3e8651ec0870f9de9733e3&v=4"
                alt="User profile"
              />
            </button>
          </div>
        </header>

        <div className="app-body">
          <div className={`app-body-navigation ${isMenuOpen ? "open" : ""}`}>
            <nav className="navigation">
              <Link href="/dashboard">
                <span>{authenticated?.user.username}</span>
              </Link>
              <Link href="/dashboard/makepayment">
                <span>Make Payment</span>
              </Link>
              <a href="/dashboard/requestleave">
                <span>Request Leave</span>
              </a>
              <a href="/dashboard/payments">
                <span>Payments</span>
              </a>
            </nav>
          </div>

        <div className="You">
          <h2 id="requestleave" className="text-center w-full">Request Leave</h2>
          <form className="leave-form" onSubmit={handleSubmit}>
            <label htmlFor="fromDate">From Date:</label>
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              required
              className="text-black"
            />

            <label htmlFor="toDate">To Date:</label>
            <input
              type="date"
              id="toDate"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              required
              className="text-black"
            />

            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="text-black"
            />

            <label htmlFor="document">Upload Application:</label>
            <input
              type="file"
              id="document"
              name="document"
              onChange={handleFileChange}
              className=""
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Requestleave;
