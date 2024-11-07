"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
import { toast, Toaster } from "react-hot-toast";
function Contact() {
  const address = "Aryabhatta Hoestel NIT Patna , Bihta Campus";

  const [load, setload] = useState(false);
  const [formData, setformData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendEmailInfo = async () => {
    setload(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/home/contact/send`,
        { formData }
      );
      toast.success("Message send Successfully");
      setformData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send email. Please try again later.");
      console.error("Error sending email:", error.message);
    } finally {
      setload(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (load != true) {
      sendEmailInfo();
    }
  };

  return (
    <div className="flex ring-neutral-700 justify-between place-items-center gap-5 bg-black items-stretch p-6 flex-col md:flex-row">
      <div className="w-full h-auto md:w-1/2 p-4 bg-whit text-white rounded-lg shadow-xl relative overflow-hidden ring-2 ring-rose-800 bg-gradient-to-tr from-slate-800 via-slate-500 via-slate-800 to-slate-800">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">
          Our Location:
        </h2>
        <p className="mb-4 text-center text-white">{address}</p>
        <div className="mb-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.8529143976807!2d84.82941117484981!3d25.576559816231747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3992a9001d14ec65%3A0xae5cfb86e1debacd!2sNIT%20PATNA%20BIHTA%20CAMPUS!5e0!3m2!1sen!2sin!4v1727946299513!5m2!1sen!2sin"
            width="100%"
            height="500"
            allowFullScreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div
        className="w-full md:w-1/2 p-4 rounded-lg shadow-lg relative overflow-hidden h-auto "
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.15);",
          border: "2px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-white">
          Contact Us
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex justify-around flex-col"
        >
          <div className="mb-4 relative">
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2"
              style={{ color: "white" }}
            >
              Name
            </label>
            <input
              type="text"
              onChange={handleInputChange}
              id="name"
              name="name"
              value={formData?.name}
              required
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-neon-blue transition duration-200 text-black"
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
              style={{ color: "white" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
              value={formData?.email}
              required
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-neon-blue transition duration-200 text-black"
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-2"
              style={{ color: "white" }}
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              required
              name="message"
              value={formData?.message}
              onChange={handleInputChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-neon-blue transition duration-200 text-black"
            ></textarea>
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white rounded-lg px-4 py-2 ${
              load ? "" : "hover:bg-blue-500"
            } transition duration-200 shadow-lg ${
              load ? "bg-rose-800 text-white" : ""
            }`}
          >
            {load ? "Sending....." : "Send Message"}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Contact;
