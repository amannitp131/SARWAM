'use client';
import Navbar from "../../components/header";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formData, setFormData] = useState({});
  const [tempData, setTempData] = useState({});
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [otpSendCooldown, setOtpSendCooldown] = useState(false); // Disable OTP button
  const router = useRouter();

  const steps = [
    {
      title: "Personal Info",
      fields: [
        { label: "Your Name", type: "text", name: "name" },
        { label: "Roll Number", type: "text", name: "rollNumber" },
        { label: "Email", type: "email", name: "email" },
        {
          label: "Select Your Hostel",
          type: "select",
          name: "hostel",
          options: [
            "Aryabhatta Hostel",
            "Sone Hostel",
            "Kadambini Hostel",
            "Brahmaputra Hostel",
            "Kosi Hostel",
            "Ganga Hostel",
            "Kosi Extension Hostel",
          ],
        },
      ]
    },
    {
      title: "Send OTP",
      fields: [
        {
          label: "Enter OTP",
          type: "text",
          name: "otp",
        },
      ],
    },
    {
      title: "Password",
      fields: [
        { label: "User Name", type: "text", name: "username" },
        { label: "Password", type: "password", name: "password" },
        {
          label: "Confirm Password",
          type: "password",
          name: "confirmPassword",
        },
      ],
    },
    {
      title: "Type",
      fields: [
        { label: "College Name", type: "text", name: "collegeName" },
        {
          label: "Select which defines you best",
          type: "select",
          name: "userType",
          options: ["Admin", "Contractor", "Student"],
        },
      ],
    },
    {
      title: "Profile",
      fields: [
        {
          label: "Upload your college identity card",
          type: "file",
          name: "profileImage",
        },
      ],
    },
    { title: "Declaration", fields: [] },
  ];

  // Styles
  const bodyStyle = {
    height:'90.5vh',
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage:
      "url('https://t3.ftcdn.net/jpg/06/37/79/62/240_F_637796226_liOHveRjDicrSL7U5Z4ErzMaFf2c1ybe.jpg')",
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

  const progressBarStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  };

  const progressCircleStyle = (index) => ({
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: index < currentStep ? "green" : index === currentStep ? "black" : "#ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
  });

  const connectingLineStyle = {
    height: "2px",
    width: "40px",
    backgroundColor: "#4D4DFF", // Updated line color
    alignSelf: "center",
  };
  const inputStyle = {
    width: "100%",
    maxWidth: "500px",
    margin: "10px 0",
    padding: "10px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "5px",
    boxSizing: "border-box",
    backgroundColor: "white",
    color: "#000",
  };

  const selectStyle = {
    width: "100%",
    maxWidth: "500px",
    margin: "10px 0",
    padding: "10px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "5px",
    backgroundColor: "white",
    color: "#000",
    boxSizing: "border-box",
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
    boxSizing: "border-box",
  };

  const handleNext = async () => {
    if (currentStep === 0) {
      await sendOtp();
    } else if (currentStep === 1) {
      await verifyOtp();
    } else if (currentStep === steps.length - 1) {
      if (isConfirmed) {
        handleSubmit();
      } else {
        alert("Please confirm the declaration before finishing the signup.");
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        ...tempData,
      }));
      setCurrentStep(currentStep + 1);
    }
  };

  const sendOtp = async () => {
    if (otpSendCooldown) return; 
    setOtpSendCooldown(true);
    setIsLoading(true);

    console.log("Sending OTP to:", tempData.email); 
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/v1/sendOtp`, {
        email: tempData.email,
      });
      setIsOtpSent(true);
      toast.success("OTP sent to your email!");
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error("Error sending OTP:", error); 
      const errorMessage = error?.response?.data?.message || "An error occurred.";
      toast.error(`Failed to send OTP: ${errorMessage}`);
    } finally {
      setIsLoading(false); 
      setTimeout(() => {
        setOtpSendCooldown(false); 
      }, 30000); 
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/v1/verifyOtp`, {
        email: tempData.email,
        otp,
      });
      if (response.data.success) {
        toast.success("OTP verified!");
        setCurrentStep(currentStep + 1);
      } else {
        toast.error("Invalid OTP, please try again.");
      }
    } catch (error) {
      toast.error("Verification failed: " + (error?.response?.data?.message || "An error occurred."));
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTempData(formData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setTempData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
    if (name === "otp") setOtp(value);
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (formData[key] instanceof File) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/v1/signup`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Signup successful!");
      router.push('/login');
    } catch (error) {
      toast.error("Signup failed: " + (error?.response?.data?.message || "An error occurred."));
    }
  };

  return (
    <>
      <Navbar />
      <div style={bodyStyle}>
        <div style={containerStyle}>
          <h1 style={{ color: "white" }}>Signup</h1>

          <div style={progressBarStyle}>
            {steps.map((_, index) => (
              <React.Fragment key={index}>
                <div style={{ position: "relative", margin: "0 5px" }}>
                  <div style={progressCircleStyle(index)}>
                    {index < currentStep ? "✔" : index + 1}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    style={{
                      height: "2px",
                      width: "40px",
                      backgroundColor: "#ccc",
                      alignSelf: "center",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <form>
            {steps[currentStep].fields.map((field, index) => {
              if (field.type === "select") {
                return (
                  <select key={index} name={field.name} style={selectStyle} required onChange={handleInputChange}>
                    <option value="" disabled selected>
                      {field.label}
                    </option>
                    {field.options.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                );
              }
              if (field.type === "file") {
                return (
                  <div key={index} style={{ margin: "10px 0", textAlign: "left" }}>
                    <label style={{ marginBottom: "5px", display: "block", color: "white" }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      style={inputStyle}
                      autoComplete="off"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                );
              }
              return (
                <input
                  key={index}
                  type={field.type}
                  name={field.name}
                  placeholder={field.label}
                  autoComplete="off"
                  style={inputStyle}
                  required
                  value={tempData[field.name] || ''}
                  onChange={handleInputChange}
                />
              );
            })}

            {/* OTP section */}
            {currentStep === 1 && (
              <div style={{ textAlign: "left", margin: "10px 0" }}>
                <label style={{ color: "white" }}>
                  <input
                    type="text"
                    value={otp}
                    placeholder="Enter the OTP sent to your email"
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                </label>
              </div>
            )}

            {/* Declaration section */}
            {currentStep === steps.length - 1 && (
              <div style={{ textAlign: "left", margin: "10px 0" }}>
                <label style={{ color: "white" }}>
                  <input
                    type="checkbox"
                    checked={isConfirmed}
                    onChange={() => setIsConfirmed(!isConfirmed)}
                    autoComplete="off"
                  />
                  I confirm that all the information provided is correct.
                </label>
              </div>
            )}
          </form>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {currentStep === 0 ? (
              <button
                style={buttonStyle}
                onClick={handleNext}
                disabled={isLoading || otpSendCooldown} // Disable if loading or cooldown
              >
                {isLoading ? "Sending..." : "Next"}
              </button>
            ) : (
              <>
                <button style={{ ...buttonStyle, width: "calc(50% - 5px)" }} onClick={handlePrev}>
                  Previous
                </button>
                <button
                  style={{ ...buttonStyle, width: "calc(50% - 5px)" }}
                  onClick={handleNext}
                >
                  Next
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;