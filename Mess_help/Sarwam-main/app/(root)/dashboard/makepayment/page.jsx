'use client';
import React, { useState, useContext } from 'react';
import Navbar from '../../../components/navbar';
import { UserContext } from '../../context/user.context';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';

const Makepayment = () => {
  const [amount, setAmount] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [totalPay, setTotalPay] = useState(0);
  const [itemsPurchased, setItemsPurchased] = useState([]);
  const [authenticated] = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Chicken', price: 24 },
    { name: 'Rosgulla', price: 7.5 },
    { name: 'Fish', price: 24 },
    { name: 'Rabdi', price: 20 },
    { name: 'Dahi', price: 20 },
    { name: 'Milk', price: 20 },
    { name: 'Boiled Egg', price: 15 },
    { name: 'Mushroom', price: 40 },
  ];

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleAddPrice = (price, name) => {
    setAmount((prevAmount) => parseFloat(prevAmount) + parseFloat(price));

    setItemsPurchased((prevItems) => {
      const existingItem = prevItems.find(item => item.name === name);
      if (existingItem) {
        return prevItems.map(item =>
          item.name === name ? { ...item, quantity: item.quantity + 1, total: item.total + price } : item
        );
      } else {
        return [...prevItems, { name, quantity: 1, total: price }];
      }
    });
  };

  const handleAmountChange = (e) => {
    const inputAmount = e.target.value;
    setAmount(inputAmount === '' ? 0 : parseFloat(inputAmount));
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const fetchData = async (authenticated, itemsPurchased, totalAmount) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/student/savePrice/${authenticated.user.id}`, {
        items: itemsPurchased,
        totalAmount: totalAmount,
      });
      return response.data;
    } catch (error) {
      console.error('Error saving payment data:', error);
      throw error;
    }
  };

  const handlePayment = async () => {
    if (amount > 0) {
      const currentDateTime = new Date().toLocaleString();
      const [date, time] = currentDateTime.split(', ');

      const newPayment = {
        amount,
        date,
        time,
        itemsPurchased,
      };

      setPaymentDetails(newPayment);
      setTotalPay((prevTotal) => parseFloat(prevTotal) + parseFloat(amount));
      setIsModalVisible(true);
      setAmount(0);
      setItemsPurchased([]);

      try {
        await fetchData(authenticated, itemsPurchased, amount);
        console.log("Payment saved successfully.");
      } catch (error) {
        console.error("Error saving payment:", error);
      }
    }
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
            <Link href="/dashboard/requestleave">
              <span>Request Leave</span>
            </Link>
            <Link href="/dashboard/payments">
              <span>Payments</span>
            </Link>
          </nav>
        </div>

        <div className="You">
          <div className={`make-payment-container ${isModalVisible ? 'blur-background' : ''}`}>
            <h2 id='makepay'>Make a Payment</h2>
            <input
              type="text"
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange}
              className="make-payment-input"
            />
            <button onClick={handlePayment} className="make-payment-button">
              Pay
            </button>

            {isModalVisible && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close-button" onClick={handleCloseModal}>✖</span>
                  <h3>Payment Successful</h3>
                  <p className="payment-detail"><strong>Amount Paid:</strong> ₹{paymentDetails.amount}</p>
                  <p className="payment-detail"><strong>Date:</strong> {paymentDetails.date}</p>
                  <p className="payment-detail"><strong>Time:</strong> {paymentDetails.time}</p>
                  <p className="payment-detail"><strong>Items Purchased:</strong></p>
                  <ul>
                    {paymentDetails.itemsPurchased.map((item, index) => (
                      <li key={index}>{item.name} (x{item.quantity}): ₹{item.total}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="box-container">
              {menuItems.map((item, index) => (
                <div className="box" key={index} onClick={() => handleAddPrice(item.price, item.name)}>
                  <h4>{item.name}</h4>
                  <p>Price: ₹{item.price} per pcs</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makepayment;
