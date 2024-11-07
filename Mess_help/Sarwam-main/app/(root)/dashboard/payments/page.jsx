"use client";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/user.context";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../../../components/navbar";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
const Payment = () => {
  const [authenticated] = useContext(UserContext);
  const [paymentData, setPaymentData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/student/getPayment/${authenticated?.user?.id}`
      );
      setPaymentData(response.data);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  useEffect(() => {
    
    fetchData();
    // toast.success("This section will contain all your payment history in the format , spent on ,time , amount ,quantity")
  }, []);

  // if (!paymentData.length) {
  //   return <div className="payment-container">Loading...</div>;
  // }
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="app">
      <Navbar />
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
  <div className="payment-container flex flex-col items-center p-4">
    <h2
      id="hispay"
      className="text-xl text-center text-cyan-500 font-semibold mb-6"
    >
      Payment History
    </h2>
    <div className="payment-grid flex flex-row flex-wrap justify-center gap-6">
      {paymentData.map((payment, index) => (
        <div
          key={index}
          className="payment-card flex flex-col gap-4 ring-2 ring-sky-700 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105"
        >
          <div className="payment-info p-4">
            <p className="text-lg font-bold text-gray-800">
              <strong>Amount Paid:</strong> ₹{payment.totalAmount}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Date of Payment:</strong>{" "}
              {new Date(payment.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Time of Payment:</strong>{" "}
              {new Date(payment.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Payment;
