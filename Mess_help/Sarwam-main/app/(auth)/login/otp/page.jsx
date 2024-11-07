'use client';
import React, { useState, useEffect, useRef } from 'react';
// import Navbar from '@/app/components/header';
import Navbar from '../../../components/navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
// import { UserContext } from '@/app/(root)/context/user.context';
import { UserContext } from '../../../(root)/context/user.context';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
const App = () => {
    const router=useRouter();
  const [email, setEmail] = useState(''); // State for email input
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState(Array(5).fill(''));
  const inputRefs = useRef([]);
  const [authenticated] = useContext(UserContext);

  // Styles
  const bodyStyle = {
    height: "90.5vh",
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url('https://t3.ftcdn.net/jpg/06/37/79/62/240_F_637796226_liOHveRjDicrSL7U5Z4ErzMaFf2c1ybe.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const containerStyle = {
    width: "400px",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    boxShadow: "0 8px 40px rgba(0, 0, 0, 0.2)",
    borderRadius: "15px",
    padding: "40px",
    textAlign: "center",
  };

  const titleStyle = {
    color: "white",
    marginBottom: "20px",
    fontSize: "24px", 
    fontWeight: "600",
  };

  const inputStyle = {
    width: "50px",
    height: "50px",
    margin: "0 5px",
    padding: "10px",
    border: "2px solid rgba(255, 255, 255, 0.6)",
    borderRadius: "8px",
    backgroundColor: "white",
    color: "#000",
    textAlign: "center",
    fontSize: "20px",
    transition: "border-color 0.3s",
  };

  const emailInputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    border: "2px solid rgba(255, 255, 255, 0.6)",
    borderRadius: "8px",
    backgroundColor: "white",
    color: "#000",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#4D4DFF",
    color: "#fff",
    cursor: "pointer",
    boxSizing: "border-box",
    fontSize: "16px",
    transition: "background-color 0.3s, transform 0.3s",
    fontWeight: "bold",
  };

  const buttonHoverStyle = {
    backgroundColor: "#3b3bff",
    transform: "scale(1.05)",
  };
  

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/v1/sendOtp`, {
        email: email || authenticated.user.email,
      });
      if (response.data.success) {
        toast.success('OTP sent successfully');
        setShowOtpInput(true);
      }
    } catch (e) {
      toast.error('Error sending OTP');
      console.log(e);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }

  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleInputFocus = (index) => {
    inputRefs.current[index].select();
  };

  const handleVerifyClick = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/v1/verifyOtp`, {
        email: email || authenticated.user.email,
        otp: otp,
      });
  
      if (response.data.success) {
        toast.success('OTP verified successfully!');
        router.push('/login/otp/resetPassword');
      } else {
        toast.error(response.data.message || 'Invalid OTP, please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('An error occurred while verifying the OTP.');
    }
  };
  

  return (
    <>
      <Navbar />
      <div style={bodyStyle}>
        <div style={containerStyle}>
          <h1 style={titleStyle}>
            {showOtpInput ? "Verify Your OTP" : "Verify Your Email"}
          </h1>
          {!showOtpInput ? (
            <>
              <input
                type="email"
                style={emailInputStyle}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                style={buttonStyle}
                onClick={handleSendOtp}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4D4DFF"}
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "20px" }}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    style={inputStyle}
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={() => handleInputFocus(index)}
                    maxLength="1"
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>
              <button
                style={{ ...buttonStyle, opacity: otp.every(digit => digit !== '') ? 1 : 0.5 }}
                disabled={otp.some(digit => digit === '')} onClick={handleVerifyClick}
              >
                Verify OTP
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
