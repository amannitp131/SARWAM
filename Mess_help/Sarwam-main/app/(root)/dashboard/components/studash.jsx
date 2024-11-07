import React, { useState } from "react";
import { MdHome } from "react-icons/md";
import { FaRestroom, FaBars, FaMoneyBillAlt } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import Link from "next/link";
import { PiStudent } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
const Studash = ({
  id,
  username,
  hostel,
  rollNo,
  isVerified,
  email,
  college,
  coupon = "2*500",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const [userDetails, setuserDetails] = useState({
    id: id,
    username: username,
    hostel: hostel,
    rollNo: rollNo,
    isVerified: isVerified,
    email: email,
    college: college,
    coupon: coupon,
    roomNo: 518,
  });

  return (
    <div id="student">
      {console.log(userDetails)}
      <div className="app">
        <header className="app-header">
          <div className="app-header-logo">
            <h1 className="logo-title">
              <span>{userDetails.college}</span>
            </h1>
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            <FaBars />
          </button>
          <div className="app-header-actions">
            <button className="user-profile">
              <span>{userDetails.name}</span>
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
                <span>{userDetails.username}</span>
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

          <section className="service-section">
            <div className="tiles">
              {Object.entries({
                "Hostel": userDetails.hostel,
                "Room No": userDetails.roomNo,
                "Roll No": userDetails.rollNo,
                "Coupon Used": "coupon spending details",
                "Student Name": userDetails.username,
                "isVerified": "Not Verified",
              }).map(([title, value], index) => (
                <article className="tile" key={index}>
                  <div className="tile-header">
                    <h3 className="flex flex-col justify-around gap-4 items-center">
                      <span className="text-cyan-500 font-medium">
                        {title}:
                      </span>
                      <span>{value}</span>
                    </h3>
                  </div>
                  <a href="#">
                    <span className="icon-button">
                      {title === "Room No" && (<MdHome />)}
                      {title==='Roll No' && (<IoSchool />)}
                      {title ==='Coupon Used' && (<FaMoneyBillAlt />)}
                      {title==='isVerified' && (<FaCheckCircle />)}
                      {title==='Student Name' && (<FaRestroom />)}
                      {title==='Hostel' && (<MdHome />)}
                    </span>
                  </a>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Studash;
