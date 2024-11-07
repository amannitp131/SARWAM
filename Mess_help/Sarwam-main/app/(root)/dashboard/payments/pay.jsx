'use client'
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/user.context";
import axios from "axios";

const Payment = () => {
  const [authenticated] = useContext(UserContext);
  const [paymentData, setPaymentData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/student/getPayment/${authenticated?.user?.id}`);
      setPaymentData(response.data);
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // if (!paymentData.length) {
  //   return <div className="payment-container">Loading...</div>;
  // }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="logo-title">National Institute of Technology, Patna</h1>
        <div className="app-header-actions">
          <button className="user-profile">
            <span>Aman Mishra</span>
            <img src="https://assets.codepen.io/285131/almeria-avatar.jpeg" alt="User profile" />
          </button>
        </div>
      </header>

      <div className="app-body">
        <div className="app-body-navigation">
          <nav className="navigation">
            <a href="/"><span>You</span></a>
            <a href="/makepayment"><span>Make Payment</span></a>
            <a href="/requestleave"><span>Request Leave</span></a>
            <a href="/payments"><span>Payments</span></a>
          </nav>
        </div>

        <div className="You">
          <div className="payment-container">
            <h2 id="hispay">Payment History</h2>
            <div className="payment-grid">
              {paymentData.map((payment, index) => (
                <div key={index} className="payment-card">
                  <div className="payment-info">
                    <p><strong>Amount Paid:</strong> ₹{payment.totalAmount}</p>
                    <p><strong>Date of Payment:</strong> {new Date(payment.createdAt).toLocaleDateString()}</p>
                    <p><strong>Time of Payment:</strong> {new Date(payment.createdAt).toLocaleTimeString()}</p>
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
