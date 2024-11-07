'use client';
import React, { useState } from "react";
import Navbar from "../../../../components/navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({ email: '', username: '', newPassword: '' });
  const router = useRouter();

  const bodyStyle = {
    height: "90.5vh",
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url('https://t3.ftcdn.net/jpg/06/37/79/62/240_F_637796226_liOHveRjDicrSL7U5Z4ErzMaFf2c1ybe.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const containerStyle = {
    width: "400px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    padding: "30px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "5px",
    backgroundColor: "white",
    color: "#000",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#4D4DFF",
    color: "#fff",
    cursor: "pointer",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/v1/updatePassword`, {
        email: formData.email,
        username: formData.username,
        newPassword: formData.newPassword,
      });

      if (response.status === 200) {
        toast.success("Password updated successfully!");
        router.push("/login");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      if (error.response) {
        toast.error("Update failed: " + (error.response.data.message || "Unknown error"));
      } else {
        toast.error("Update failed: " + error.message);
      }
    }
  };

  return (
    <>
      <Toaster />
      <Navbar />
      <div style={bodyStyle}>
        <div style={containerStyle}>
          <h1 style={{ color: "white" }} className="text-xl">Update Password</h1>
          <form onSubmit={handleUpdatePassword}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              style={inputStyle}
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              style={inputStyle}
              required
              value={formData.username}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              style={inputStyle}
              required
              value={formData.newPassword}
              onChange={handleInputChange}
            />
            <button type="submit" style={buttonStyle}>
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
